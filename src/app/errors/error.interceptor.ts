import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthServiceService } from './../services/auth/auth-service.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = localStorage.getItem('token');
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user}`
                }
            });
        }

        return next.handle(request);
    }
}