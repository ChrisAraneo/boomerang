import { Observable, catchError, from, map, of } from 'rxjs';
import { request } from 'undici';
import { Response } from './models/response.type';

export class HttpClient {
  get(url: string): Observable<Response> {
    return from(request(url)).pipe(
      map((response) => ({
        ok: response.statusCode % 100 === 2,
        status: response.statusCode,
        body: response.body || null,
      })),
      catchError(() => of({ ok: false })),
    );
  }
}
