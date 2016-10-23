import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserViewModel } from './registerUserViewModel';
import { RegisterUserRequest } from '../../../services/user/requests/register.user.request';
import { UserTypeService } from '../../../services/userType/userType.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService} from '../../../services/user/user.service';
import { CompareValidatorDirective } from '../../../directives/compare.directive';
import { MustBeTrueValidatorDirective } from '../../../directives/must-be-true.directive';
import { RequiredIfValidatorDirective } from '../../../directives/required-if.directive';
import { Option } from '../../../common/option.common';

@Component({
    moduleId: module.id,
    selector: 'sd-register-user',
    templateUrl: 'registerUserComponent.html',
    styleUrls: ['registerUserComponent.css'],
    directives: [CompareValidatorDirective, MustBeTrueValidatorDirective, RequiredIfValidatorDirective]
})
export class RegisterUserComponent implements OnInit {
    viewModel: RegisterUserViewModel;
    active: boolean;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private userService: UserService,
                private userTypeService: UserTypeService) {
        
        this.viewModel = {
            userTypes: null,
            userTypeSelected: false,
            email: null,
            alreadyRegistered: false,
            password: null,
            confirmPassword: null,
            firstName: null,
            lastName: null,
            stageName: null
        };
    }

    ngOnInit() {
        this.userTypeService.get()
            .subscribe(
            response => {
                this.viewModel.userTypes = response.map(userType => {
                    return new Option(userType.description, userType.id, false);
                });
            },
            error => {
                //
            },
            () => {
                //
            });

        this.active = true;
    }

    clearAlreadyRegistered() {
        this.viewModel.alreadyRegistered = false;
    }

    onSubmit(registerUserForm: any) {
        if (!registerUserForm.valid) {
            return;
        }

        this.authenticationService.clearToken();
        
        var request: RegisterUserRequest = {
            username: this.viewModel.email,
            password: this.viewModel.password,
            confirmPassword: this.viewModel.confirmPassword,
            firstName: this.viewModel.firstName,
            lastName: this.viewModel.lastName,
            stageName: this.viewModel.stageName,
            userTypeIds: this.viewModel.userTypes
                .filter(userType => { return userType.selected; })
                .map(userType => { return userType.value; })
        };

        this.userService.register(request)
            .subscribe(
            response => {
                this.router.navigate(['user/register-success']);
            },
            error => {
                if (error.status === 409) {
                    this.viewModel.alreadyRegistered = true;
                }
            },
            () => {   
                //Do nothing.
            });
    }
}

//https://angular.io/docs/ts/latest/guide/forms.html
//https://medium.com/@daviddentoom/angular-2-form-validation-9b26f73fcb81#.v9rt96s5e
//http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
//https://vitalets.github.io/checklist-model/
