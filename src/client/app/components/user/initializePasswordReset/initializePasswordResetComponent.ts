import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import { InitializePasswordResetViewModel } from './initializePasswordResetViewModel';
import { InitializePasswordResetRequest } from '../../../services/user/requests/initializePasswordResetRequest';
import { UserService} from '../../../services/user/user.service';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-initialize-password-reset',
    templateUrl: 'initializePasswordResetComponent.html',
    styleUrls: ['initializePasswordResetComponent.css']
})
export class InitializePasswordResetComponent {
    viewModel: InitializePasswordResetViewModel;
    
    constructor(private router: Router,
                private userService: UserService) {
        this.viewModel = {
            email: null,
            elementState: ElementState.Ready,
        };
    }

    onSubmit(initializePasswordResetForm: any) {
        if (!initializePasswordResetForm.valid) {
            return;
        }
                
        this.viewModel.elementState = ElementState.Loading;

        var request: InitializePasswordResetRequest = {
            username: this.viewModel.email
        };

        this.userService.initializePasswordReset(request)
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
