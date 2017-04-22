import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComposeMessageComponent } from './composeMessageComponent';
import { CountyService } from '../../../services/county/countyService';
import { MessageService } from '../../../services/message/messageService';
import { UserService } from '../../../services/user/user.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule ],
    declarations: [ComposeMessageComponent],
    exports: [ComposeMessageComponent],
    providers: [
        MessageService,
        UserService]
})

export class ComposeMessageModule { }
