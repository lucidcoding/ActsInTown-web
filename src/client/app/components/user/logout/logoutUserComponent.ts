import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'sd-logout-user',
    templateUrl: 'logoutUserComponent.html',
    styleUrls: ['logoutUserComponent.css']
})
export class LogoutUserComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService,
                private router: Router)  {
        //Do nothing.
    }
    
    ngOnInit() {
        this.authenticationService.clearToken();
    }
}
