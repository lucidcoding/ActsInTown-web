import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogoutUserComponent } from './logoutUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [LogoutUserComponent],
    exports: [LogoutUserComponent],
    providers: [
        AuthenticationService
    ]
})

export class LogoutUserModule { }
