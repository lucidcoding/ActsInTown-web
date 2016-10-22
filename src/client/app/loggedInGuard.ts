// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) { }

    canActivate() {
        if(!this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/user/login']);
            return false;
        }
        
        return true;
    }
}

//https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9#.4leo48a3n
