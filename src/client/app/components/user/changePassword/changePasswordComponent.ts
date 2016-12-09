import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordViewModel } from './changePasswordViewModel';
import { ChangePasswordRequest } from '../../../services/user/requests/changePasswordRequest';
import { UserService} from '../../../services/user/user.service';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-change-password',
    templateUrl: 'changePasswordComponent.html',
    styleUrls: ['changePasswordComponent.css']
})
export class ChangePasswordComponent implements OnInit {
    public changePasswordForm: FormGroup;
    public changePasswordFormSubmitted: boolean;
    public viewModel: ChangePasswordViewModel;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private userService: UserService) {
       
        this.viewModel = {
            elementState: ElementState.Ready
        };
    }

    ngOnInit() {
        this.changePasswordForm = new FormGroup({
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', [
                Validators.required, 
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)\\S{6,15}')
            ]),
            confirmNewPassword: new FormControl('', [
                Validators.required
            ])
        });
        
        this.changePasswordFormSubmitted = false;
    }
    
    /*compare(formControl: FormControl) {
        let compareValue = (<FormControl> formControl._parent.controls['confirmNewPassword']).value;
        if(formControl.value === compareValue) {
            return {
                compare: true
            };
        } else {
            return null;
        }
    }*/

    onSubmit() {
        this.changePasswordFormSubmitted = true;
        
        if (!this.changePasswordForm.valid) {
            return;
        }
        
        this.viewModel.elementState = ElementState.Loading;
        
        var request: ChangePasswordRequest = {
            oldPassword: (<FormControl> this.changePasswordForm.controls['oldPassword']).value,
            newPassword: (<FormControl> this.changePasswordForm.controls['newPassword']).value,
            confirmNewPassword: (<FormControl> this.changePasswordForm.controls['confirmNewPassword']).value,
        }
        
         /*var request: ChangePasswordRequest = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }*/

        this.userService.changePassword(request)
            .subscribe(
            response => {
                this.viewModel.elementState = ElementState.Submitted;
            },
            error => {
                this.viewModel.elementState = ElementState.SubmissionError;
            },
            () => {   
                //Do nothing.
            });
    }
}
