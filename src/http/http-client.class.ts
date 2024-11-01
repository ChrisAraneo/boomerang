import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { request } from 'undici';

import { Response } from '../models/response.interface';

export class HttpClient {
  get(url: string): Observable<Response> {
    return from(request(url)).pipe(
      mergeMap((response) =>
        from(response.body.text()).pipe(
          map((body) => ({
            ok: this.isOk(response.statusCode),
            status: response.statusCode,
            body: body,
          })),
        ),
      ),
      catchError(() => of({ ok: false })),
    );
  }

  private isOk(statusCode: number): boolean {
    return Math.floor(statusCode / 100) <= 3;
  }
}
