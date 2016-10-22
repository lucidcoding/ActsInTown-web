import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sd-home',
    templateUrl: 'homeComponent.html',
    styleUrls: ['homeComponent.css']
})
export class HomeComponent {

    constructor(private router: Router) {
    }

    goLogin() {
        this.router.navigate(['user/login']);
    }

}

//https://github.com/BlackrockDigital/startbootstrap-creative
//https://blackrockdigital.github.io/startbootstrap-creative/
//https://startbootstrap.com/template-overviews/creative/
