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

import { HttpClient } from './http-client.class';
import { Logger } from './logger.class';

export class Boomerang {
  private _statuses = new BehaviorSubject<number | null>(null);
  private subscription?: Subscription;

  constructor(
    private readonly url: string,
    private readonly debounceTime: number,
    private readonly logger: Logger,
    private readonly httpClient: HttpClient,
  ) {}

  get statuses(): Observable<number> {
    return this._statuses.pipe(
      tap(() => {
        this.logger.info(`Throwing boomerang at ${this.url}`);
      }),
      mergeMap((status) => {
        return this.httpClient.get(this.url).pipe(
          map((response) => ({
            previousStatus: status,
            currentStatus: response.status || null,
          })),
        );
      }),
      tap(({ currentStatus }) => {
        this.logger.info(
          `Boomerang hit the target at came back with status ${currentStatus}`,
        );
      }),
      debounceTime(this.debounceTime),
      tap(({ currentStatus }) => {
        this._statuses.next(currentStatus);
      }),
      map(({ currentStatus }) => currentStatus),
      filter((status) => typeof status === 'number'),
      // TODO Play sound
    );
  }

  run(): void {
    this.subscription = this.statuses.subscribe();
  }

  destroy(): void {
    this.subscription?.unsubscribe();
  }
}
