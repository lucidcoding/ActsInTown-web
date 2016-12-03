import { EventEmitter, Injectable, OpaqueToken } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../config/config.service';
import { LoginRequest } from './requests/loginRequest';

@Injectable()
export class AuthenticationService {
    public accessTokenKey = 'accessToken';
    public refreshTokenKey = 'refreshToken';
    public authenticatedStateChanged$: EventEmitter<boolean>;

    constructor(
            private http: Http,
            private configService: ConfigService) {
        this.authenticatedStateChanged$ = new EventEmitter<boolean>();
    }

    setToken(accessToken: string, refreshToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        this.authenticatedStateChanged$.emit(true);
    }

    clearToken(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        this.authenticatedStateChanged$.emit(false);
    }
    
    isLoggedIn(): boolean {
        return localStorage.getItem(this.accessTokenKey) !== null;
    }
    
	login(request: LoginRequest): Observable<any> {
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
            
		return this.http.post(url, {}, options);
    }
}
