import { Observable } from 'rxjs/Rx';
import { Adal5Service } from './adal5.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

/**
 *
 *
 * @export
 * @class Adal5HTTPService
 */
@Injectable()
export class Adal5HTTPService {

  /**
   *
   *
   * @static
   * @param {HttpClient} http
   * @param {Adal5Service} service
   *
   * @memberOf Adal5HTTPService
   */
  static factory(http: HttpClient, service: Adal5Service) {
    return new Adal5HTTPService(http, service);
  }

  /**
   * Creates an instance of Adal5HTTPService.
   * @param {HttpClient} http
   * @param {Adal5Service} service
   *
   * @memberOf Adal5HTTPService
   */
  constructor(
    private http: HttpClient,
    private service: Adal5Service
  ) { }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  get(url: string, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.sendRequest('get', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  post(url: string, body: any, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    options.body = body;
    return this.sendRequest('post', url, options);
    // console.log(response);
    // return response;
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  delete(url: string, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.sendRequest('delete', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  patch(url: string, body: any, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    options.body = body;
    return this.sendRequest('patch', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  put(url: string, body: any, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    options.body = body;
    return this.sendRequest('put', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal5HTTPService
   */
  head(url: string, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.sendRequest('head', url, options);
  }

  /**
   *
   *
   * @private
   * @param {string} url
   * @param {RequestOptionsArgs} options
   * @returns {Observable<string>}
   *
   * @memberOf Adal5HTTPService
   */
  private sendRequest(method: string, url: string, options: {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    reportProgress?: boolean;
    observe: 'response';
    params?: HttpParams | { [param: string]: string | string[]; };
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<string> {

    const resource = this.service.GetResourceForEndpoint(url);
    let authenticatedCall: Observable<string>;
    if (resource) {
      if (this.service.userInfo.authenticated) {
        authenticatedCall = this.service.acquireToken(resource)
          .flatMap((token: string) => {
            // if (options.headers == null) {
            //   let headers = new HttpHeaders();
            //   headers = headers
            //     .set('Authorization', `Bearer ${token}`);
            //   options.headers = headers;
            // } else {
            //   options.headers.set('Authorization', 'Bearer ' + token);
            // }
            // let headers = new HttpHeaders();
            // headers = headers.set('Authorization', `Bearer ${token}`);
            // headers = headers.set('Accept', 'application/json');
            // headers = headers.set('Content-Type', 'application/json');

            options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json'), observe: 'response' };
            if (method === 'post') {
              return this.http.post(url, options.body, { headers: {'Authorization': 'Bearer ' + token}
              , observe: 'response' } )
                .catch(this.handleError);
            } else if (method === 'get') {
              return this.http.get(url, options)
                .catch(this.handleError);
            } else if (method === 'put') {
              return this.http.put(url, options.body, options)
                .catch(this.handleError);
            } else if (method === 'patch') {
              return this.http.patch(url, options.body, options)
                .catch(this.handleError);
            } else if (method === 'delete') {
              return this.http.delete(url, options)
                .catch(this.handleError);
            }
          });
      } else {
        authenticatedCall = Observable.throw(new Error('User Not Authenticated.'));
      }
    } else {
      // authenticatedCall = this.http.request(url, options).catch(this.handleError);
      if (method === 'post') {
        authenticatedCall = this.http.post(url, options.body, options)
          .catch(this.handleError);
      } else if (method === 'get') {
        authenticatedCall = this.http.get(url, options)
          .catch(this.handleError);
      } else if (method === 'put') {
        authenticatedCall = this.http.put(url, options.body, options)
          .catch(this.handleError);
      } else if (method === 'patch') {
        authenticatedCall = this.http.patch(url, options.body, options)
          .catch(this.handleError);
      } else if (method === 'delete') {
        authenticatedCall = this.http.delete(url, options)
          .catch(this.handleError);
      }
    }

    return authenticatedCall;
  }

  /**
   *
   *
   * @private
   * @param {*} error
   * @returns
   *
   * @memberOf Adal5HTTPService
   */
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    const errMsg = error.message || 'Server error';
    console.error(JSON.stringify(error)); // log to console instead

    return Observable.throw(error);
  }
}
