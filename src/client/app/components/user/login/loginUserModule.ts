import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginUserComponent } from './loginUserComponent';
import { AuthenticationService, AuthenticationServiceToken } from '../../../services/authentication/authentication.service';
import { ConfigService, ConfigServiceToken } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [LoginUserComponent],
    exports: [LoginUserComponent],
    providers: [
        provide(AuthenticationServiceToken, { useClass: AuthenticationService }),
        provide(ConfigServiceToken, { useClass: ConfigService }),
        UserService
    ]
})

export class LoginUserModule { }
