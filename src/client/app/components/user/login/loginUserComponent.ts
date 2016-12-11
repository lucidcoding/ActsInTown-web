import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserViewModel } from './loginUserViewModel';
import { LoginRequest } from '../../../services/authentication/requests/loginRequest';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';
import { ElementState } from '../../../common/elementState';

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
            failedLogin: false,
            elementState: ElementState.Ready
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

        this.viewModel.elementState = ElementState.Loading;
        
        var request: LoginRequest = {
            username: this.viewModel.email,
            password: this.viewModel.password,
            rememberMe: this.viewModel.rememberMe
        };

        this.authenticationService.login(request)
            .subscribe(
            response => {
                this.viewModel.elementState = ElementState.Ready;
                let body = JSON.parse((<any> response)._body);
                this.authenticationService.setToken(body.access_token, body.refresh_token, body.expires_in);
                this.router.navigate(['spot/list']);
            },
            error => {
                if (error.status === 401) {
                    this.viewModel.elementState = ElementState.Ready;
                    this.viewModel.failedLogin = true;
                } else {
                    this.viewModel.elementState = ElementState.SubmissionError;
                }
            },
            () => {
                //Do nothing.
            });
    }
}
