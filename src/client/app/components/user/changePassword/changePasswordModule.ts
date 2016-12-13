import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './changePasswordComponent';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { CompareValidatorModule } from '../../../directives/compareValidator/compareValidatorModule';
import { PasswordValidatorModule } from '../../../directives/passwordValidator/passwordValidatorModule';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [
        CommonModule,
        CompareValidatorModule,
        FormsModule,
        LoadingSpinnerOverlayModule,
        PasswordValidatorModule,
        RouterModule
    ],
    declarations: [ChangePasswordComponent],
    exports: [ChangePasswordComponent],
    providers: [
        ConfigService,
        UserService
    ]
})

export class ChangePasswordModule { }
