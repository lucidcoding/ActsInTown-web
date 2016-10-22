import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    constructor(private router: Router) {
    }
}
