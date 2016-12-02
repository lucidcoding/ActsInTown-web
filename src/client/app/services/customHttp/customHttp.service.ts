import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, RequestOptionsArgs, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

//http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2
//https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/

@Injectable()
export class CustomHttpService {
    constructor( @Inject(Http) private http: Http) {
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let headers = new Headers();

        if (localStorage.getItem('accessToken')) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }

        let newOptions = new RequestOptions({ headers: headers });
        return this.http.get(url, newOptions);
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
