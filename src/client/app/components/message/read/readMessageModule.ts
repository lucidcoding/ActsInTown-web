import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReadMessageComponent } from './readMessageComponent';
import { MessageService } from '../../../services/message/messageService';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule ],
    declarations: [ReadMessageComponent],
    exports: [ReadMessageComponent],
    providers: [
        MessageService]
})

export class ReadMessageModule { }
