import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListSpotsComponent } from './listSpotsComponent';
import { SpotService } from '../../../services/spot/spot.service';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [ListSpotsComponent],
    exports: [ListSpotsComponent],
    providers: [
        SpotService
    ]
})

export class ListSpotsModule { }
