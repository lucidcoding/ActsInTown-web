import { Component, Inject } from '@angular/core';
import { ListViewModel } from './viewModels/listSpotViewModel';
import { ISpotService } from '../../../services/spot/ispot.service';
import { SpotServiceToken } from '../../../services/spot/spot.service';

@Component({
    moduleId: module.id,
    selector: 'sd-list-spots',
    templateUrl: 'listSpotsComponent.html',
    styleUrls: ['listSpotsComponent.css']
})
export class ListSpotsComponent {
    viewModel: ListViewModel;

    constructor(
        @Inject(SpotServiceToken) private spotService: ISpotService) {
        this.viewModel = {
            spots: [],
            spotsLoaded: false
        };

        this.spotService.getForCurrentUser()
            .subscribe(
            response => {
                this.viewModel.spots = response.map(spot => {
                    return {
                        id: spot.id,
                        scheduledFor: spot.scheduledFor,
                        durationMinutes: spot.durationMinutes,
                        townName: spot.town.name,
                        venueName: spot.venueName
                    };
                });

                this.viewModel.spotsLoaded = true;
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!'));
    }
}
