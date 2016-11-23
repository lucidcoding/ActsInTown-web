import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './resetPasswordComponent';
import { ConfigService, ConfigServiceToken } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { LoadingSpinnerModule } from '../../shared/loadingSpinner/loadingSpinnerModule';
import { CompareValidatorModule } from '../../../directives/compareValidator/compareValidatorModule';

@NgModule({
    imports: [CommonModule, CompareValidatorModule, FormsModule, LoadingSpinnerModule, RouterModule],
    declarations: [ResetPasswordComponent],
    exports: [ResetPasswordComponent],
    providers: [
        UserService
    ]
})

export class ResetPasswordModule { }
