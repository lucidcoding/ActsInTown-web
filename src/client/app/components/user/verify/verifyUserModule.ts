import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VerifyUserComponent } from './verifyUserComponent';
import { UserService } from '../../../services/user/user.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [VerifyUserComponent],
    exports: [VerifyUserComponent],
    providers: [
        UserService
    ]
})

export class VerifyUserModule { }
