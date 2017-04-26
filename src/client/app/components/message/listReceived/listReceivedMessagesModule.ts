import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListReceivedMessagesComponent } from './listReceivedMessagesComponent';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';
import { PagerModule } from '../../shared/pager/pagerModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, PagerModule, RouterModule ],
    declarations: [ListReceivedMessagesComponent],
    exports: [ListReceivedMessagesComponent],
    providers: [
        MessageService,
        UserService]
})

export class ListReceivedMessagesModule { }
