import { Component, OnInit } from '@angular/core';
import { ListViewModel } from './viewModels/listSpotViewModel';
import { SpotService } from '../../../services/spot/spot.service';

@Component({
    moduleId: module.id,
    selector: 'sd-list-spots',
    templateUrl: 'listSpotsComponent.html',
    styleUrls: ['listSpotsComponent.css']
})
export class ListSpotsComponent implements OnInit {
    public viewModel: ListViewModel;

    constructor(private spotService: SpotService) {
        this.viewModel = {
            spots: [],
            spotsLoaded: false
        };
    }

    public ngOnInit() {
        this.spotService.getForCurrentUser()
            .subscribe(
            response => {
                this.viewModel.spots = response.map(spot => {
                    return {
                        id: spot.id,
                        scheduledFor: spot.scheduledFor,
                        durationMinutes: spot.durationMinutes,
                        townName: spot.town.name,
                        venueName: spot.venueName,
                        description: spot.description
                    };
                });

                this.viewModel.spotsLoaded = true;
            },
            error => {
                console.error('Error: ' + error);
            },
            () => {
                //
            });
    }
}
