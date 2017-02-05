import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListConversationsComponent } from './listConversationsComponent';
import { ConversationService } from '../../../services/conversation/conversationService';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [ListConversationsComponent],
    exports: [ListConversationsComponent],
    providers: [
        ConversationService,
        MessageService,
        UserService
    ]
})

export class ListConversationsModule { }
