import { catchError, from, map, Observable, of } from 'rxjs';
import { request } from 'undici';

import { Response } from './models/response.interface';

export class HttpClient {
  get(url: string): Observable<Response> {
    return from(request(url)).pipe(
      map((response) => ({
        ok: this.isOk(response.statusCode),
        status: response.statusCode,
        body: response.body || null,
      })),
      catchError(() => of({ ok: false })),
    );
  }

  private isOk(statusCode: number): boolean {
    return Math.floor(statusCode / 100) <= 3;
  }
}
