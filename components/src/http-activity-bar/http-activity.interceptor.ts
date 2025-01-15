import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpActivityService } from './http-activity.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpActivityInterceptor implements HttpInterceptor {
  constructor(private service: HttpActivityService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const me = this;
    me.service.showIndicator();
    return next.handle(request).pipe(
      finalize(() => {
        me.service.hideIndicator();
      })
    );
  }
}
