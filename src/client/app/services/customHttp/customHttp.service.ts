import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';

//http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2
//https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/

@Injectable()
export class CustomHttpService {
    constructor( 
        @Inject(Http) private http: Http,
        private router: Router) {
    }

    getApiBaseUrl(): string {
		return 'https://localhost:8443/ActsInTown-api/';
	}
    
    refresh(): Observable<Response> {
        let encoded = btoa("my-trusted-client:");
 
        let headers = new Headers({
            "Authorization": "Basic " + encoded,
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        });
        
        let options = new RequestOptions({ headers: headers });
        
        var url = this.getApiBaseUrl() + 'oauth/token?grant_type=refresh_token&refresh_token=' + 
            localStorage.getItem('refreshToken');
            
		return this.http.post(url, {}, options);
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let headers = new Headers();

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });
        return this.http.get(url, newOptions)
            .catch((initialError: Response) => {
                
                if (initialError && initialError.status === 401) { // && isSecureCall === true) {
                    
                    //http://stackoverflow.com/questions/38999235/angular2-rest-request-http-status-code-401-changes-to-0
                    
                    // token might be expired, try to refresh token
                    return this.refresh()
                        .flatMap(refreshResult => {
                            let body = JSON.parse(refreshResult._body);
                            localStorage.setItem('accessToken', body.access_token);
                            localStorage.setItem('refreshToken', body.refresh_token);
                            
                            
                            let headers = new Headers();

                            if (localStorage.getItem('accessToken')) {
                                headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
                            }
                    
                            let newOptions = new RequestOptions({ headers: headers });
                            return this.http.get(url, newOptions)
                            
                            
                            
                            //return refreshResult;
                            /*if (authenticationResult.IsAuthenticated == true) {
                                // retry with new token
                                //me.authService.setAuthorizationHeader(request.headers);
                                //return this.http.request(url, request);
                            } else {
                                return Observable.throw(initialError);
                            }*/
                        })
                        .catch((refreshError: Response) => {
                            console.log(refreshError);
                            return Observable.throw(refreshError);
                        });
                }
                else {
                    return Observable.throw(initialError);
                }
            
                //this.router.navigate(['user/login']);
                //return Observable.throw(error)
            });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let bodyJson = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyJson, newOptions);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let bodyJson = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });
        return this.http.put(url, bodyJson, newOptions);
    }
}

export let UserServiceToken = new OpaqueToken('UserServiceToken');
