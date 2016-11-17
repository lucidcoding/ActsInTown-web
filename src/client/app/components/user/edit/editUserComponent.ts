import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserViewModel } from './editUserViewModel';
import { EditUserRequest } from '../../../services/user/requests/editUserRequest';
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
            userTypeOptions: null,
            userTypeIds: [],
            userTypeSelected: false,
            firstName: null,
            lastName: null,
            stageName: null
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
                this.viewModel.userTypeOptions = response.map(userType => {
                    return new Option(userType.description, userType.id, false);
                });
            },
            error => {
                console.log('Error:' + error);
            },
            () => {
                console.log('Done');
            });
            
        this.userTypeService.getForCurrentUser()
            .subscribe(
            response => {
                this.viewModel.userTypeIds = response.map(userType => {
                    return userType.id;
                });
            },
            error => {
                console.log('Error:' + error);
            },
            () => {
                console.log('Done');
            });
    }

    userTypeIdSelected(userTypeId: string) {
        return this.viewModel.userTypeIds.indexOf(userTypeId) > -1;
    }
    
    selectUserType(userTypeId: any, event: any) {
        if(event.target.checked) {
            this.viewModel.userTypeIds.push(userTypeId);
        } else {
            this.viewModel.userTypeIds.splice(userTypeId, 1);
        }
    }
    
    onSubmit(editUserForm: any) {
        if (!editUserForm.valid) {
            return;
        }
        
        var request: EditUserRequest = {
            firstName: this.viewModel.firstName,
            lastName: this.viewModel.lastName,
            stageName: this.viewModel.stageName,
            userTypeIds: this.viewModel.userTypeOptions
                .filter(userType => { return userType.selected; })
                .map(userType => { return userType.value; })
        };

        this.userService.edit(this.viewModel.id, request)
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
