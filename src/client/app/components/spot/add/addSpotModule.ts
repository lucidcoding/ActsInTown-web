import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddSpotComponent } from './addSpotComponent';
import { CountyService } from '../../../services/county/countyService';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateTimeSelectorModule } from '../../shared/dateTimeSelector/dateTimeSelectorModule';
import { FutureDateValidatorModule } from '../../../directives/futureDateValidator/futureDateValidatorModule';
import { LoadingSpinnerOverlayModule } from '../../shared/loadingSpinnerOverlay/loadingSpinnerOverlayModule';

@NgModule({
    imports: [CommonModule, DateTimeSelectorModule, FormsModule, FutureDateValidatorModule, LoadingSpinnerOverlayModule, RouterModule ],
    declarations: [AddSpotComponent],
    exports: [AddSpotComponent],
    providers: [
        SpotService,
        CountyService,
        TownService,
        CustomHttpService]
})

export class AddSpotModule { }
