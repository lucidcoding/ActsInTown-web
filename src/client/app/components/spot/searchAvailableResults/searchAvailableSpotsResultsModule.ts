import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchAvailableSpotsResultsComponent } from './searchAvailableSpotsResultsComponent';
import { SpotService, SpotServiceToken } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';
import { DateSelectorModule } from '../../shared/dateSelector/dateSelectorModule';
import { FutureDateValidatorModule } from '../../../directives/futureDateValidatorModule';

@NgModule({
    imports: [CommonModule, DateSelectorModule, FormsModule, FutureDateValidatorModule, RouterModule],
    declarations: [SearchAvailableSpotsResultsComponent],
    exports: [SearchAvailableSpotsResultsComponent],
    providers: [
        provide(SpotServiceToken, { useClass: SpotService }),
        CustomHttpService]
})

export class SearchAvailableSpotsResultsModule { }
