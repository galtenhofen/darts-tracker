import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  tcErrorId = '';

  constructor(private cookieService: CookieService,
    private router: Router) { }

  public handleError<T> (operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      let message;
      this.tcErrorId = 'UNKNOWN';
      if (err.status === 401) {
        this.cookieService.deleteAll();
        //this._window.nativeWindow.localStorage.clear();
        //const redirectUrl = err.headers.get('X-TC-SSO-URL');
        //message = `ErrorHandlerService: Received ${err.status}: Redirecting to "${redirectUrl}"`;
        //this.tcErrorId = '401';
        //this._window.nativeWindow.location.href = redirectUrl;
        this.router.navigateByUrl('/error');
      } else
        if (err.status === 0) {
        this.tcErrorId = 'API-HOST-NOT-FOUND';
        this.router.navigateByUrl('/error');

      } else {
        message = `ErrorHandlerService: Received ${err.status}: Redirecting to error page`;
        this.tcErrorId = `STATUS ${err.status}`;
        try {
          const tcError = err.error;
          if (tcError) {
            console.log('tcErrorId ', tcError.tcErrorId);
            this.tcErrorId = tcError.tcErrorId;
          }
        } catch (err) {
        }
        this.router.navigateByUrl('/error');
      }

      // Let the app keep running by returning an empty result.
      return throwError(message);
    };
  }

}
