import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './changePasswordComponent';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    declarations: [ChangePasswordComponent],
    exports: [ChangePasswordComponent],
    providers: [
        ConfigService,
        UserService
    ]
})

export class ChangePasswordModule { }