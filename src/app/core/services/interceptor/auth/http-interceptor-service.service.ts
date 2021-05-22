import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authorization');
    if (token !== null) {
      const requestClone = request.clone({
        headers: request.headers.set('authorization', token),
      });
      return next.handle(requestClone).pipe(
        tap((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
            if (response.headers) {
              const auth = response.headers.get('authorization');
              if (auth) {
                localStorage.setItem('authorization', auth);
              }
            }
          }
        })
      );
    }

    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          if (response.headers) {
            const auth = response.headers.get('authorization');
            if (auth) {
              localStorage.setItem('authorization', auth);
            }
          }
        }
      })
    );
  }
}
