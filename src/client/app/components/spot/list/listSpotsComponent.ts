import { Component, OnInit } from '@angular/core';
import { ListViewModel } from './viewModels/listSpotViewModel';
import { SpotService } from '../../../services/spot/spot.service';
import { ElementState } from '../../../common/elementState';
import { RowViewModel } from './viewModels/rowViewModel';

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
        this.getSpots();
    }

    private getSpots() {
        this.spotService.getForCurrentUser().subscribe(
            response => {
                this.viewModel.spots = response.map(spot => {
                    let viewModelRow: RowViewModel = {
                        id: spot.id,
                        scheduledFor: spot.scheduledFor,
                        durationMinutes: spot.durationMinutes,
                        townName: spot.town.name,
                        venueName: spot.venueName,
                        description: spot.description,
                        imageUrl: spot.user.imageUrl,
                        bookedStateDescription: null
                    };
                    
                    if (spot.bookedState === 'AVAILABLE') {
                        viewModelRow.bookedStateDescription = 'A spot I have available';
                    } else if (spot.bookedState === 'BOOKED') {
                        viewModelRow.bookedStateDescription = 'A spot I am booked for';
                    }
                    
                    return viewModelRow;
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
    
    public delete(event: any, id: string) { //event is MouseEvent but can't find what package that is in!
        event.preventDefault();
        
        this.spotService.delete(id).subscribe(
            response => {
                this.getSpots();
            },
            error => {
                console.log();
            },
            () => {
                //
            });
    }
}
