import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../authentication/authentication.service';

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
    
    request(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.addAuthenticationHeaders(options);
        
        return this.http.request(url, options)
            .catch((initialError: Response) => {
                if (initialError && initialError.status === 401) {
                    return this.authenticationService.refresh()
                        .flatMap(refreshResult => {
                            let body = JSON.parse((<any> refreshResult)._body);
                            localStorage.setItem('accessToken', body.access_token);
                            localStorage.setItem('refreshToken', body.refresh_token);
                            options = this.addAuthenticationHeaders(options);
                            return this.http.request(url, options)
                        })
                        .catch((refreshError: Response) => {
                            if (refreshError && refreshError.status === 401) {
                                this.router.navigate(['user/login']);
                            }
                            
                            return Observable.throw(refreshError);
                        });
                }
                else {
                    return Observable.throw(initialError);
                }
            });
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.addAuthenticationHeaders(options);
        options.method = 'get';
        return this.request(url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.addAuthenticationHeaders(options);
        options = this.addContentTypeHeaders(options);
        options.method = 'post';
        options.body = JSON.stringify(body);
        return this.request(url, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.addAuthenticationHeaders(options);
        options = this.addContentTypeHeaders(options);
        options.method = 'put';
        options.body = JSON.stringify(body);
        return this.request(url, options);
    }
}
