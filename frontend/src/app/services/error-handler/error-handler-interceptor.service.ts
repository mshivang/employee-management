import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.code !== 'token_not_valid') {
          // Unauthorized, attempt to refresh token
          return this.userService.refreshToken$().pipe(
            switchMap(() => {
              // Retry the original request with the new token

              const newRequest = request.clone();
              return next.handle(newRequest);
            }),
            catchError(() => {
              // If refreshing token fails, redirect to login
              this.userService.logoutUser();
              return throwError(error);
            })
          );
        } else {
          // For other errors, simply pass through
          this.userService.logoutUser();
          this.router.navigate(['']);
          return throwError(error);
        }
      })
    );
  }
}
