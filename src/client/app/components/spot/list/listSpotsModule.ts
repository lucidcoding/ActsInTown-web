import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListSpotsComponent } from './listSpotsComponent';
import { SpotService, SpotServiceToken } from '../../../services/spot/spot.service';
import { LoadingSpinnerModule } from '../../shared/loadingSpinner/loadingSpinnerModule';

@NgModule({
    imports: [CommonModule, FormsModule, LoadingSpinnerModule, RouterModule],
    declarations: [ListSpotsComponent],
    exports: [ListSpotsComponent],
    providers: [
        provide(SpotServiceToken, { useClass: SpotService })]
})

export class ListSpotsModule { }
