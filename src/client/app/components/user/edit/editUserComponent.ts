import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserViewModel } from './editUserViewModel';
import { EditUserRequest } from '../../../services/user/requests/editUserRequest';
import { ChangePasswordRequest } from '../../../services/user/requests/changePasswordRequest';
import { UserTypeService } from '../../../services/userType/userType.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService} from '../../../services/user/user.service';
//import { MustBeTrueValidatorDirective } from '../../../directives/must-be-true.directive';
//import { RequiredIfValidatorDirective } from '../../../directives/required-if.directive';
import { Option } from '../../../common/option.common';

@Component({
    moduleId: module.id,
    selector: 'sd-edit-user',
    templateUrl: 'editUserComponent.html',
    styleUrls: ['editUserComponent.css']
    //,
    //directives: [MustBeTrueValidatorDirective, RequiredIfValidatorDirective]
})
export class EditUserComponent implements OnInit {
    public viewModel: EditUserViewModel;

    constructor(private authenticationService: AuthenticationService,
                private router: Router,
                private userService: UserService,
                private userTypeService: UserTypeService) {
        
        this.viewModel = {
            id: null,
            userTypes: null,
            userTypeSelected: false,
            firstName: null,
            lastName: null,
            stageName: null,
            oldPassword: null,
            newPassword: null,
            confirmNewPassword: null
        };
    }

    ngOnInit() {
        this.userService.getCurrent()
            .subscribe(
            response => {
                this.viewModel.id = response.id;
                this.viewModel.firstName = response.firstName;
                this.viewModel.lastName = response.lastName;
                this.viewModel.stageName = response.stageName;
            },
            error => {
                console.log('Error:' + error);
            },
            () => {
                console.log('Done');
            });
            
        this.userTypeService.get()
            .subscribe(
            response => {
                this.viewModel.userTypes = response.map(userType => {
                    return new Option(userType.description, userType.id, false);
                });
                
                this.userTypeService.getForCurrentUser()
                    .subscribe(
                    response => {
                        response.forEach(responseUserType => {
                            this.viewModel.userTypes.forEach(viewModelUserType => {
                                if(responseUserType.id === viewModelUserType.value) {
                                    viewModelUserType.selected = true;
                                }
                            });
                        });
                    },
                    error => {
                        console.log('Error:' + error);
                    },
                    () => {
                        console.log('Done');
                    });
            },
            error => {
                console.log('Error:' + error);
            },
            () => {
                console.log('Done');
            });
    }
    
    onSubmit(editUserForm: any) {
        if (!editUserForm.valid) {
            return;
        }
        
        var request: EditUserRequest = {
            firstName: this.viewModel.firstName,
            lastName: this.viewModel.lastName,
            stageName: this.viewModel.stageName,
            userTypeIds: this.viewModel.userTypes
                .filter(userType => { return userType.selected; })
                .map(userType => { return userType.value; })
        };

        this.userService.editCurrent(request)
            .subscribe(
            response => {
                this.router.navigate(['user/register-success']);
            },
            error => {
                console.log('Error:' + error)
            },
            () => {   
                //Do nothing.
            });
    }
    
    changePassword(changePasswordForm: any) {
        if (!changePasswordForm.valid) {
            return;
        }
        
        var request: ChangePasswordRequest = {
            oldPassword: this.viewModel.oldPassword,
            newPassword: this.viewModel.newPassword,
            confirmNewPassword: this.viewModel.confirmNewPassword
        }
        
        this.userService.changePassword(request)
            .subscribe(
            response => {
                this.router.navigate(['user/register-success']);
            },
            error => {
                console.log('Error:' + error)
            },
            () => {   
                //Do nothing.
            });
    }
}
