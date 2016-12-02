import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './editUserComponent';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { UserTypeService } from '../../../services/userType/userType.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [EditUserComponent],
    exports: [EditUserComponent],
    providers: [
        ConfigService,
        UserService,
        UserTypeService
    ]
})

export class EditUserModule { }