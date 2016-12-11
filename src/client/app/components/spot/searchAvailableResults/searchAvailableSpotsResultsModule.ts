import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchAvailableSpotsResultsComponent } from './searchAvailableSpotsResultsComponent';
import { SpotService } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateSelectorModule } from '../../shared/dateSelector/dateSelectorModule';
import { FutureDateValidatorModule } from '../../../directives/futureDateValidator/futureDateValidatorModule';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, DateSelectorModule, FormsModule, FutureDateValidatorModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [SearchAvailableSpotsResultsComponent],
    exports: [SearchAvailableSpotsResultsComponent],
    providers: [
        SpotService,
        CustomHttpService]
})

export class SearchAvailableSpotsResultsModule { }
