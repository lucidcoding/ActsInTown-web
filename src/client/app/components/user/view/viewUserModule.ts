import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewUserComponent } from './viewUserComponent';
import { ConversationService } from '../../../services/conversation/conversationService';
import { UserService } from '../../../services/user/user.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [ViewUserComponent],
    exports: [ViewUserComponent],
    providers: [
        ConversationService,
        UserService
    ]
})

export class ViewUserModule { }
