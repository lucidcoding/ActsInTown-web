import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchSpotsComponent } from './searchSpotsComponent';
import { CountyService } from '../../../services/county/countyService';
import { SpotService } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateSelectorModule } from '../../shared/dateSelector/dateSelectorModule';
import { FutureDateValidatorModule } from '../../../directives/futureDateValidator/futureDateValidatorModule';

@NgModule({
    imports: [CommonModule, DateSelectorModule, FormsModule, FutureDateValidatorModule, RouterModule],
    declarations: [SearchSpotsComponent],
    exports: [SearchSpotsComponent],
    providers: [
        CountyService,
        SpotService,
        CustomHttpService
    ]
})

export class SearchSpotsModule { }
