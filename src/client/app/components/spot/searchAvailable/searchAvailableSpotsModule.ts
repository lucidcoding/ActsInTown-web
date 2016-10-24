import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchAvailableSpotsComponent } from './searchAvailableSpotsComponent';
import { SpotService } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateSelectorModule } from '../../shared/dateSelector/dateSelectorModule';
import { FutureDateValidatorModule } from '../../../directives/futureDateValidatorModule';

@NgModule({
    imports: [CommonModule, DateSelectorModule, FormsModule, FutureDateValidatorModule, RouterModule],
    declarations: [SearchAvailableSpotsComponent],
    exports: [SearchAvailableSpotsComponent],
    providers: [
        SpotService,
        CustomHttpService
    ]
})

export class SearchAvailableSpotsModule { }
