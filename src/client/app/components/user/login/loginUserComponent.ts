import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserViewModel } from './loginUserViewModel';
import { LoginUserRequest } from '../../../services/user/requests/login.user.request';
import { IAuthenticationService } from '../../../services/authentication/iauthentication.service';
import { AuthenticationServiceToken } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'sd-login-user',
    templateUrl: 'loginUserComponent.html',
    styleUrls: ['loginUserComponent.css']
})
export class LoginUserComponent {
    viewModel: LoginUserViewModel;
    active: boolean;

    constructor(
            @Inject(AuthenticationServiceToken) private authenticationService: IAuthenticationService,
            private userService: UserService,
            private router: Router)  {
        this.viewModel = {
            email: null,
            password: null,
            rememberMe: null,
            failedLogin: false
        };
    }

    clearFailedLogin() {
        this.viewModel.failedLogin = false;
    }

    onSubmit(loginUserForm: any) {
        this.viewModel.failedLogin = false;

        if (!loginUserForm.valid) {
            return;
        }

        var request: LoginUserRequest = {
            //username: this.viewModel.email.replace('+', '%20'),
            username: this.viewModel.email,
            password: this.viewModel.password,
            rememberMe: this.viewModel.rememberMe
        };

        this.userService.login(request)
            .subscribe(
            response => {
                this.authenticationService.setToken(response._body);
                this.router.navigate(['spot/list']);
            },
            error => {
                if (error.status === 401) {
                    this.viewModel.failedLogin = true;
                }
            },
            () => {
                console.log('Completed!');
            });
    }
}
