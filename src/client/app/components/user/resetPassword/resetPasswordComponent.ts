import { Component, OnDestroy, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordViewModel } from './resetPasswordViewModel';
import { ResetPasswordRequest } from '../../../services/user/requests/resetPasswordRequest';
import { UserTypeService } from '../../../services/userType/userType.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService} from '../../../services/user/user.service';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-reset-password',
    templateUrl: 'resetPasswordComponent.html',
    styleUrls: ['resetPasswordComponent.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    private viewModel: ResetPasswordViewModel;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
        this.viewModel = {
            passwordResetToken: null,
            email: null,
            password: null,
            confirmPassword: null,
            elementState: ElementState.Ready
        };
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.viewModel.passwordResetToken = params['passwordResetToken'];
            this.viewModel.elementState = ElementState.Ready;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(resetPasswordForm: any) {
        if (!resetPasswordForm.valid) {
            return;
        }

        var request: ResetPasswordRequest = {
            username: this.viewModel.email,
            passwordResetToken: this.viewModel.passwordResetToken,
            password: this.viewModel.password,
            confirmPassword: this.viewModel.confirmPassword
        };

        this.userService.resetPassword(request)
            .subscribe(
            response => {
                console.log('OK');
            },
            error => {
                console.log('Error:' + error);
            },
            () => {   
                //Do nothing.
            });
    }
}
