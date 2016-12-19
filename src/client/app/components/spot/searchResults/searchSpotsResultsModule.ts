import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchSpotsResultsComponent } from './searchSpotsResultsComponent';
import { SpotService } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateSelectorModule } from '../../shared/dateSelector/dateSelectorModule';
import { FutureDateTimeValidatorModule } from '../../../directives/futureDateTimeValidator/futureDateTimeValidatorModule';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, DateSelectorModule, FormsModule, FutureDateTimeValidatorModule, LoadingSpinnerOverlayModule, RouterModule],
    declarations: [SearchSpotsResultsComponent],
    exports: [SearchSpotsResultsComponent],
    providers: [
        SpotService,
        CustomHttpService]
})

export class SearchSpotsResultsModule { }
