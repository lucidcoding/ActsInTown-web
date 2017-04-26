// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/user/login']);
            return false;
        }

        if (this.authenticationService.isExpired()) {
            this.authenticationService.clearToken();
            
            this.authenticationService.refresh().subscribe(
                response => {
                    let body = JSON.parse((<any> response)._body);
                    this.authenticationService.setToken(body.access_token, body.refresh_token, body.expires_in);
                    //this.router.navigate(state.url);
                    this.router.navigate([state.url]);
                },
                error => {
                    this.router.navigate(['user/login']);
                },
                () => {
                    //Do nothing.
                });
                
            return false;
        }

        return true;
    }
}
