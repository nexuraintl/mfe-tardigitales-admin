// src/app/interceptors/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authStorage = inject(OAuthStorage, { optional: true });

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authStorage ? (this.authStorage.getItem('access_token') || this.authStorage.getItem('id_token')) : null;

    // Solo adjuntar el token si la petición se dirige al API Gateway (absoluta o relativa)
    if (token && (req.url.startsWith(environment.apiGatewayUrl) || req.url.startsWith('/apig'))) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      return next.handle(authReq);
    }

    const clonedReq = req.clone({
      withCredentials: true
    });
    return next.handle(clonedReq);
  }
}


