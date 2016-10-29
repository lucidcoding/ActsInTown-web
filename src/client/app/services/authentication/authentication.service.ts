import { EventEmitter, Injectable, OpaqueToken } from '@angular/core';

@Injectable()
export class AuthenticationService {
    public tokenKey = 'token';
    public authenticatedStateChanged$: EventEmitter<boolean>;

    constructor() {
        this.authenticatedStateChanged$ = new EventEmitter<boolean>();
    }
    
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
        this.authenticatedStateChanged$.emit(true);
    }

    clearToken(): void {
        localStorage.removeItem(this.tokenKey);
        this.authenticatedStateChanged$.emit(false);
    }
    
    isLoggedIn(): boolean {
        return localStorage.getItem(this.tokenKey) !== null;
    }
}
