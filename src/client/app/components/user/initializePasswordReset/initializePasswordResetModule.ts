import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InitializePasswordResetComponent } from './initializePasswordResetComponent';
import { ConfigService } from '../../../services/config/config.service';
import { UserService } from '../../../services/user/user.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [InitializePasswordResetComponent],
    exports: [InitializePasswordResetComponent],
    providers: [
        UserService
    ]
})

export class InitializePasswordResetModule { }
