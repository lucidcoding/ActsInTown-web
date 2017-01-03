import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserViewModel } from './editUserViewModel';
import { EditUserRequest } from '../../../services/user/requests/editUserRequest';
import { UserTypeService } from '../../../services/userType/userType.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService} from '../../../services/user/user.service';
import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-edit-user',
    templateUrl: 'editUserComponent.html',
    styleUrls: ['editUserComponent.css']
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
            elementState: ElementState.Loading
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
                                        if (responseUserType.id === viewModelUserType.value) {
                                            viewModelUserType.selected = true;
                                        }
                                    });
                                });
                                
                                this.viewModel.elementState = ElementState.Ready;
                            },
                            error => {
                                this.viewModel.elementState = ElementState.LoadingError;
                            },
                            () => {
                                //Do nothing.
                            });
                    },
                    error => {
                        this.viewModel.elementState = ElementState.LoadingError;
                    },
                    () => {
                        //Do nothing.
                    });
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //Do nothing.
            });
    }

    onSubmit(editUserForm: any) {
        if (!editUserForm.valid) {
            return;
        }

        this.viewModel.elementState = ElementState.Loading;
        
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
                this.viewModel.elementState = ElementState.Submitted;
                //this.router.navigate(['user/register-success']);
            },
            error => {
                this.viewModel.elementState = ElementState.SubmissionError;
            },
            () => {   
                //Do nothing.
            });
    }
}
