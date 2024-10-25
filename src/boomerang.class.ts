import { platform } from 'node:process';

import path from 'path';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  mergeMap,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import soundPlay from 'sound-play';

import { HttpClient } from './http-client.class';
import { Logger } from './logger.class';
import { Status } from './models/status.interface';

export class Boomerang {
  private _statuses = new BehaviorSubject<Status | null>(null);
  private subscription?: Subscription;
  private isLinux: boolean = platform !== 'win32' && platform !== 'darwin';

  constructor(
    private readonly url: string,
    private readonly debounceTime: number,
    private readonly logger: Logger,
    private readonly httpClient: HttpClient,
  ) {}

  get statuses(): Observable<Status> {
    return this._statuses.pipe(
      tap(() => {
        this.logger.info(`Throwing boomerang at ${this.url}`);
      }),
      mergeMap((status) => {
        return this.httpClient.get(this.url).pipe(
          map((response) => ({
            previous: status,
            current: {
              ok: response.ok,
              status: response.status || null,
            },
          })),
        );
      }),
      tap(({ current }) => {
        const currentStatus = current.status;

        if (typeof currentStatus === 'number') {
          this.logger.info(
            `Boomerang hit the target at came back with status ${currentStatus}`,
          );
        } else {
          this.logger.info(
            `Boomerang didn't hit the target (status ${currentStatus})`,
          );
        }
      }),
      debounceTime(this.debounceTime),
      tap(({ current }) => {
        this._statuses.next(current || null);
      }),
      tap(({ previous, current }) => {
        if (current.ok && !previous.ok) {
          this.playPingSound();
        }
      }),
      map(({ current }) => current),
      filter((current) => typeof current.status === 'number'),
    );
  }

  run(): void {
    this.subscription = this.statuses.subscribe();
  }

  destroy(): void {
    this.subscription?.unsubscribe();
  }

  private playPingSound(): void {
    const filepath = path.join(__dirname, './ping.mp3');
    const volume = 1;

    this.logger.info('Playing ping sound');

    if (this.isLinux) {
      this.logger.error('Playing sound on Linux is not supported yet');
    } else {
      soundPlay.play(filepath, volume).catch((error: unknown) => {
        this.logger.error('Error while playing sound', error);
      });
    }
  }
}
