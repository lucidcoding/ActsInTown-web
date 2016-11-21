import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InitializePasswordResetComponent } from './initializePasswordResetComponent';
import { ConfigService, ConfigServiceToken } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [InitializePasswordResetComponent],
    exports: [InitializePasswordResetComponent],
    providers: [
        UserService
    ]
})

export class InitializePasswordResetModule { }
