import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import 'rxjs/add/operator/filter';

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
    public isCollapsed: boolean;
    
    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
        this.authenticated = this.authenticationService.isLoggedIn();
        this.isCollapsed = true;
        
        this.authenticationService.authenticatedStateChanged$.subscribe(isAuthenticated => {
            this.authenticated = isAuthenticated;
        });
        
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((val) => {
                this.isCollapsed = true;
            });
    }
}
