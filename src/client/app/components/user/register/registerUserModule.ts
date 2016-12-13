import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterUserComponent } from './registerUserComponent';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { UserTypeService } from '../../../services/userType/userType.service';
import { CompareValidatorModule } from '../../../directives/compareValidator/compareValidatorModule';
import { MustBeTrueValidatorModule } from '../../../directives/mustBeTrueValidator/mustBeTrueValidatorModule';
import { PasswordValidatorModule } from '../../../directives/passwordValidator/passwordValidatorModule';
import { RequiredIfValidatorModule } from '../../../directives/requiredIfValidator/requiredIfValidatorModule';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [
        CommonModule,
        CompareValidatorModule,
        FormsModule,
        LoadingSpinnerOverlayModule,
        MustBeTrueValidatorModule,
        PasswordValidatorModule,
        RequiredIfValidatorModule,
        RouterModule
    ],
    declarations: [RegisterUserComponent],
    exports: [RegisterUserComponent],
    providers: [
        ConfigService,
        UserService,
        UserTypeService
    ]
})

export class RegisterUserModule { }
