import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-navbar',
    templateUrl: 'navbarComponent.html',
    styleUrls: ['navbarComponent.css'],
})

export class NavbarComponent {
    public authenticated: boolean;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
        this.authenticated = this.authenticationService.isLoggedIn();
        
        this.authenticationService.authenticatedStateChanged$.subscribe(isAuthenticated => {
            this.authenticated = isAuthenticated;
        });
    }
}
