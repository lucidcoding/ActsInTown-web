import { EventEmitter, Injectable, OpaqueToken } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';
import { LoginRequest } from './requests/loginRequest';

@Injectable()
export class AuthenticationService {
    public accessTokenKey = 'accessToken';
    public refreshTokenKey = 'refreshToken';
    public expiryKey = 'expiry';
    public authenticatedStateChanged$: EventEmitter<boolean>;

    constructor(
        private http: Http,
        private configService: ConfigService) {
        this.authenticatedStateChanged$ = new EventEmitter<boolean>();
    }

    setToken(accessToken: string, refreshToken: string, expiresIn: number): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        let now: Date = new Date();
        let expiry: Date = new Date(now.getTime() + expiresIn * 1000);
        localStorage.setItem(this.expiryKey, expiry.toISOString());
        this.authenticatedStateChanged$.emit(true);
    }

    clearToken(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.expiryKey);
        this.authenticatedStateChanged$.emit(false);
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem(this.accessTokenKey) === null) {
            return false;
        }
        
        return true;
    }
    
    isExpired(): boolean {                    
        let expiry = new Date(localStorage.getItem(this.expiryKey));
        let now = new Date();
        
        if (now > expiry) {
            return true;
        }

        return false;
    }

    login(request: LoginRequest): Observable<Response> {
        let encoded = btoa("my-trusted-client:");

        let headers = new Headers({
            "Authorization": "Basic " + encoded,
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        });

        let options = new RequestOptions({ headers: headers });

        var url = this.configService.getApiBaseUrl() + 'oauth/token?grant_type=password&username=' +
            encodeURIComponent(request.username) + '&password=' + encodeURIComponent(request.password);

        return this.http.post(url, {}, options);
    }

    refresh(): Observable<Response> {
        let encoded = btoa("my-trusted-client:");

        let headers = new Headers({
            "Authorization": "Basic " + encoded,
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        });

        let options = new RequestOptions({ headers: headers });

        var url = this.configService.getApiBaseUrl() + 'oauth/token?grant_type=refresh_token&refresh_token=' +
            localStorage.getItem('refreshToken');

        return this.http.post(url, {}, options)
            .map(refreshResult => {
                let body = JSON.parse((<any>refreshResult)._body);
                localStorage.setItem(this.accessTokenKey, body.access_token);
                localStorage.setItem(this.refreshTokenKey, body.refresh_token);
                let now: Date = new Date();
                let expiry: Date = new Date(now.getTime() + body.expires_in * 1000);
                localStorage.setItem(this.expiryKey, expiry.toISOString());
                return refreshResult;
            })
            .catch((refreshError: Response) => {
                if (refreshError && refreshError.status === 401) {
                    this.clearToken();
                }

                return Observable.throw(refreshError);
            });
    }
}
