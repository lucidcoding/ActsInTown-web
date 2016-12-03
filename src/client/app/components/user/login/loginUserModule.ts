import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginUserComponent } from './loginUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [LoginUserComponent],
    exports: [LoginUserComponent],
    providers: [
        AuthenticationService,
        ConfigService,
        UserService
    ]
})

export class LoginUserModule { }
