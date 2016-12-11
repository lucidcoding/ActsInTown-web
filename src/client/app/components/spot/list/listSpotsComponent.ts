import { Component, OnInit } from '@angular/core';
import { ListViewModel } from './viewModels/listSpotViewModel';
import { SpotService } from '../../../services/spot/spot.service';
import { ElementState } from '../../../common/elementState';

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
            spotsState: ElementState.Loading
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
                        description: spot.description,
                        imageUrl: spot.user.imageUrl
                    };
                });

                if(this.viewModel.spots.length > 0) {
                    this.viewModel.spotsState = ElementState.Ready;
                } else {
                    this.viewModel.spotsState = ElementState.NoData;
                }
            },
            error => {
                this.viewModel.spotsState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }
}
