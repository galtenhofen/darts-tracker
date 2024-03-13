import {catchError} from 'rxjs/operators';

import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient,
    private errorHandler: ErrorHandlerService) { 
    }

    public getWithToken<T>(uri: string): Observable<any> {
      return this.httpClient.get<T>(encodeURI(uri),
      //return this.httpClient.get<T>(encodeURI(`${this.api}${uri}`),
        {responseType: 'json'}).pipe(
        //catchError( this.errorHandler.handleError('GET ' + `${this.api}${uri}`)
      catchError( this.errorHandler.handleError('GET ' + uri)
        ));
    }
  
    public postWithToken<T>(uri: string, jsonBody: object): Observable<any> {
      return this.httpClient.post<T>(encodeURI(uri)
        , jsonBody
        , {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type':  'application/json'}
        , responseType: 'json'}).pipe(
        catchError( this.errorHandler.handleError('POST ' + uri)));
    }

    deleteWithToken<T>(uri: string): Observable<any> {
      return this.httpClient.delete<T>(encodeURI(uri), { responseType: 'json' }).pipe(
        catchError(this.errorHandler.handleError('DELETE ' + uri))
      );
    }

}
