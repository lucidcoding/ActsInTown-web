import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterUserComponent } from './registerUserComponent';
import { ConfigService, ConfigServiceToken } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { UserTypeService } from '../../../services/userType/userType.service';
import { CompareValidatorModule } from '../../../directives/compareValidator/compareValidatorModule';
import { MustBeTrueValidatorModule } from '../../../directives/mustBeTrueValidator/mustBeTrueValidatorModule';
import { RequiredIfValidatorModule } from '../../../directives/requiredIfValidator/requiredIfValidatorModule';

@NgModule({
    imports: [CommonModule, CompareValidatorModule, FormsModule, MustBeTrueValidatorModule, RequiredIfValidatorModule, RouterModule],
    declarations: [RegisterUserComponent],
    exports: [RegisterUserComponent],
    providers: [
        provide(ConfigServiceToken, { useClass: ConfigService }),
        UserService,
        UserTypeService
    ]
})

export class RegisterUserModule { }
