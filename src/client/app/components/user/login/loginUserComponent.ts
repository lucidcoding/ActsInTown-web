import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserViewModel } from './loginUserViewModel';
import { LoginUserRequest } from '../../../services/user/requests/login.user.request';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'sd-login-user',
    templateUrl: 'loginUserComponent.html',
    styleUrls: ['loginUserComponent.css']
})
export class LoginUserComponent implements OnInit {
    viewModel: LoginUserViewModel;
    active: boolean;

    constructor(private authenticationService: AuthenticationService,
                private userService: UserService,
                private router: Router)  {
        this.viewModel = {
            email: null,
            password: null,
            rememberMe: null,
            failedLogin: false
        };  
    }

    ngOnInit() {    
        //Do nothing.
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
            username: this.viewModel.email,
            password: this.viewModel.password,
            rememberMe: this.viewModel.rememberMe
        };

        this.userService.login(request)
            .subscribe(
            response => {
                let body = JSON.parse(response._body);
                this.authenticationService.setToken(body.access_token);
                this.router.navigate(['spot/list']);
            },
            error => {
                if (error.status === 401) {
                    this.viewModel.failedLogin = true;
                }
            },
            () => {
                //Do nothing.
            });
    }
}
