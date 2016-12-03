import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../authentication/authentication.service';

//http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2
//https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/

@Injectable()
export class CustomHttpService {
    constructor( 
        private http: Http,
        private router: Router,
        private configService: ConfigService,
        private authenticationService: AuthenticationService) {
    }

    private addAuthenticationHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        
        if (options.headers == null) {
            options.headers = new Headers();
        }
        
        //options.headers.append('Content-Type', 'application/json');
        options.headers.delete('Authorization');
        
        if (localStorage.getItem('accessToken')) {
            options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }
        
        return options;
    }
    
    private addContentTypeHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        
        if (options.headers == null) {
            options.headers = new Headers();
        }
        
        options.headers.append('Content-Type', 'application/json');

        return options;
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        /*let headers = new Headers();

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });*/
        options = this.addAuthenticationHeaders(options);
        
        return this.http.get(url, options)
            .catch((initialError: Response) => {
                
                if (initialError && initialError.status === 401) { // && isSecureCall === true) {
                    
                    //http://stackoverflow.com/questions/38999235/angular2-rest-request-http-status-code-401-changes-to-0
                    
                    // token might be expired, try to refresh token
                    return this.authenticationService.refresh()
                        .flatMap(refreshResult => {
                            let body = JSON.parse(refreshResult._body);
                            localStorage.setItem('accessToken', body.access_token);
                            localStorage.setItem('refreshToken', body.refresh_token);
                
                            //options = null;
                            options = this.addAuthenticationHeaders(options);
                            return this.http.get(url, options)
                            
                            
                            
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
        options = this.addAuthenticationHeaders(options);
        options = this.addContentTypeHeaders(options);
        /*let headers = new Headers({ 'Content-Type': 'application/json' });

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });*/
        return this.http.post(url, bodyJson, options);
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
