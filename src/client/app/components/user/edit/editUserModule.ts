import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './editUserComponent';
import { ConfigService, ConfigServiceToken } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { UserTypeService } from '../../../services/userType/userType.service';
import { CompareValidatorDirective } from '../../../directives/compare.directive';
import { MustBeTrueValidatorDirective } from '../../../directives/must-be-true.directive';
import { RequiredIfValidatorDirective } from '../../../directives/required-if.directive';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [EditUserComponent, CompareValidatorDirective, MustBeTrueValidatorDirective, RequiredIfValidatorDirective],
    exports: [EditUserComponent],
    providers: [
        provide(ConfigServiceToken, { useClass: ConfigService }),
        UserService,
        UserTypeService
    ]
})

export class EditUserModule { }