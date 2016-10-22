import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAuthenticationService } from '../../../services/authentication/iauthentication.service';
import { AuthenticationServiceToken } from '../../../services/authentication/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'sd-logout-user',
    templateUrl: 'logoutUserComponent.html',
    styleUrls: ['logoutUserComponent.css']
})
export class LogoutUserComponent {
    constructor(
            @Inject(AuthenticationServiceToken) private authenticationService: IAuthenticationService,
            private router: Router)  {
        this.authenticationService.clearToken();
    }
}
