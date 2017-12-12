import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReadMessageComponent } from './readMessageComponent';
import { MessageService } from '../../../services/message/messageService';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';
import { PagerModule } from '../../shared/pager/pagerModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, PagerModule, RouterModule ],
    declarations: [ReadMessageComponent],
    exports: [ReadMessageComponent],
    providers: [
        MessageService]
})

export class ReadMessageModule { }
