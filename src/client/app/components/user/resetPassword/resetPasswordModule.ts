import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './resetPasswordComponent';
import { UserService } from '../../../services/user/user.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';
import { CompareValidatorModule } from '../../../directives/compareValidator/compareValidatorModule';

@NgModule({
    imports: [CommonModule, CompareValidatorModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [ResetPasswordComponent],
    exports: [ResetPasswordComponent],
    providers: [
        UserService
    ]
})

export class ResetPasswordModule { }
