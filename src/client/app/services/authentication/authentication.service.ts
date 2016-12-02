import { EventEmitter, Injectable, OpaqueToken } from '@angular/core';

@Injectable()
export class AuthenticationService {
    public accessTokenKey = 'accessToken';
    public refreshTokenKey = 'refreshToken';
    public authenticatedStateChanged$: EventEmitter<boolean>;

    constructor() {
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
}
