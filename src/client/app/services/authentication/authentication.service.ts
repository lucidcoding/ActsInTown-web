import { Injectable, OpaqueToken } from '@angular/core';
import { IAuthenticationService } from './iauthentication.service';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
    public tokenKey = 'token';

    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    clearToken(): void {
        localStorage.removeItem(this.tokenKey);
    }
    
    isLoggedIn(): boolean {
        return localStorage.getItem(this.tokenKey) !== null;
    }
}

export let AuthenticationServiceToken = new OpaqueToken('AuthenticationServiceToken');
