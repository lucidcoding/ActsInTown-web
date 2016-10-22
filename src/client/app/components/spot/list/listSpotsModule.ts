import { provide, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListSpotsComponent } from './listSpotsComponent';
import { SpotService, SpotServiceToken } from '../../../services/spot/spot.service';
import { CustomHttpService } from '../../../services/customHttp/customHttp.service';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule],
    declarations: [ListSpotsComponent],
    exports: [ListSpotsComponent],
    providers: [
        provide(SpotServiceToken, { useClass: SpotService }),
        CustomHttpService]
})

export class ListSpotsModule { }
