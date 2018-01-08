"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
/**
 *
 *
 * @export
 * @class Adal5HTTPService
 */
var Adal5HTTPService = (function () {
    /**
     * Creates an instance of Adal5HTTPService.
     * @param {HttpClient} http
     * @param {Adal5Service} service
     *
     * @memberOf Adal5HTTPService
     */
    function Adal5HTTPService(http, service) {
        this.http = http;
        this.service = service;
    }
    Adal5HTTPService_1 = Adal5HTTPService;
    /**
     *
     *
     * @static
     * @param {HttpClient} http
     * @param {Adal5Service} service
     *
     * @memberOf Adal5HTTPService
     */
    Adal5HTTPService.factory = function (http, service) {
        return new Adal5HTTPService_1(http, service);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    Adal5HTTPService.prototype.get = function (url, options) {
        return this.sendRequest('get', url, options);
    };
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
    Adal5HTTPService.prototype.post = function (url, body, options) {
        options.body = body;
        return this.sendRequest('post', url, options);
        // console.log(response);
        // return response;
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    Adal5HTTPService.prototype.delete = function (url, options) {
        return this.sendRequest('delete', url, options);
    };
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
    Adal5HTTPService.prototype.patch = function (url, body, options) {
        options.body = body;
        return this.sendRequest('patch', url, options);
    };
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
    Adal5HTTPService.prototype.put = function (url, body, options) {
        options.body = body;
        return this.sendRequest('put', url, options);
    };
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    Adal5HTTPService.prototype.head = function (url, options) {
        return this.sendRequest('head', url, options);
    };
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
    Adal5HTTPService.prototype.sendRequest = function (method, url, options) {
        var _this = this;
        var resource = this.service.GetResourceForEndpoint(url);
        var authenticatedCall;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .flatMap(function (token) {
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
                    options = { headers: new http_1.HttpHeaders().set('Authorization', 'Bearer ' + token)
                            .set('Content-Type', 'application/json'), observe: 'response' };
                    if (method === 'post') {
                        return _this.http.post(url, options.body, { headers: { 'Authorization': 'Bearer ' + token },
                            observe: 'response' })
                            .catch(_this.handleError);
                    }
                    else if (method === 'get') {
                        return _this.http.get(url, options)
                            .catch(_this.handleError);
                    }
                    else if (method === 'put') {
                        return _this.http.put(url, options.body, options)
                            .catch(_this.handleError);
                    }
                    else if (method === 'patch') {
                        return _this.http.patch(url, options.body, options)
                            .catch(_this.handleError);
                    }
                    else if (method === 'delete') {
                        return _this.http.delete(url, options)
                            .catch(_this.handleError);
                    }
                });
            }
            else {
                authenticatedCall = Rx_1.Observable.throw(new Error('User Not Authenticated.'));
            }
        }
        else {
            // authenticatedCall = this.http.request(url, options).catch(this.handleError);
            if (method === 'post') {
                authenticatedCall = this.http.post(url, options.body, options)
                    .catch(this.handleError);
            }
            else if (method === 'get') {
                authenticatedCall = this.http.get(url, options)
                    .catch(this.handleError);
            }
            else if (method === 'put') {
                authenticatedCall = this.http.put(url, options.body, options)
                    .catch(this.handleError);
            }
            else if (method === 'patch') {
                authenticatedCall = this.http.patch(url, options.body, options)
                    .catch(this.handleError);
            }
            else if (method === 'delete') {
                authenticatedCall = this.http.delete(url, options)
                    .catch(this.handleError);
            }
        }
        return authenticatedCall;
    };
    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal5HTTPService
     */
    Adal5HTTPService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead
        return Rx_1.Observable.throw(error);
    };
    Adal5HTTPService = Adal5HTTPService_1 = __decorate([
        core_1.Injectable()
    ], Adal5HTTPService);
    return Adal5HTTPService;
    var Adal5HTTPService_1;
}());
exports.Adal5HTTPService = Adal5HTTPService;
