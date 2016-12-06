import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordViewModel } from './changePasswordViewModel';
import { ChangePasswordRequest } from '../../../services/user/requests/changePasswordRequest';
import { UserService} from '../../../services/user/user.service';

@Component({
    moduleId: module.id,
    selector: 'sd-change-password',
    templateUrl: 'changePasswordComponent.html',
    styleUrls: ['changePasswordComponent.css']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;
    
    public viewModel: ChangePasswordViewModel;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private userService: UserService) {
       
        this.viewModel = {
        };
    }

    ngOnInit() {
        this.changePasswordForm = new FormGroup({
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl(),
            confirmNewPassword: new FormControl()
        });
    }
    
    onSubmit(editUserForm: any) {
        if (!editUserForm.valid) {
            return;
        }
        
        /*var request: ChangePasswordRequest = {
            oldPassword: this.viewModel.oldPassword,
            newPassword: this.viewModel.newPassword,
            confirmNewPassword: this.viewModel.confirmNewPassword
        }*/
        
         var request: ChangePasswordRequest = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
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
