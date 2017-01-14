import { Component, OnInit } from '@angular/core';
import { ListViewModel } from './viewModels/listSpotViewModel';
import { SpotService } from '../../../services/spot/spot.service';
import { Spot } from '../../../services/spot/responses/spot.response';
import { ElementState } from '../../../common/elementState';
import { RowViewModel } from './viewModels/rowViewModel';
import '../../../common/dateExtensions';
import '../../../common/numberExtensions';

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

    private getSpots() {
        this.spotService.getForCurrentUser().subscribe(
            response => {
                this.viewModel.spots = response.map((spot: Spot) => {
                    let viewModelRow: RowViewModel = {
                        id: spot.id,
                        dateTimeHeading: '',
                        locationHeader: '',
                        description: spot.description,
                        imageUrl: spot.user.imageUrl,
                        bookedStateDescription: null
                    };
                    
                    //Seems to be some sort of bug in Angular2 which means I have to do this?
                    let scheduledForAny = <any>spot.scheduledFor;
                    let scheduledFor = new Date(scheduledForAny);

                    /*viewModelRow.dateTimeHeading =
                        padLeft(scheduledFor.getDate()) + ' ' +
                        scheduledFor.getShortMonthString() + ' ' +
                        scheduledFor.getFullYear() + ' ' +
                        padLeft(scheduledFor.getHours()) + ':' +
                        padLeft(scheduledFor.getMinutes());*/
                        
                    viewModelRow.dateTimeHeading = scheduledFor.getFormattedString();

                    if (typeof spot.durationMinutes !== 'undefined' && spot.durationMinutes !== null) {
                        viewModelRow.dateTimeHeading = viewModelRow.dateTimeHeading + ', ' +
                            spot.durationMinutes + ' mins';
                    }

                    viewModelRow.locationHeader = '';

                    if (typeof spot.venueName !== 'undefined' && spot.venueName !== null) {
                        viewModelRow.locationHeader = viewModelRow.locationHeader + spot.venueName + ', ';
                    }

                    viewModelRow.locationHeader = viewModelRow.locationHeader + spot.town.name;

                    if (spot.bookedState === 'AVAILABLE') {
                        viewModelRow.bookedStateDescription = 'A spot I have available';
                    } else if (spot.bookedState === 'BOOKED') {
                        viewModelRow.bookedStateDescription = 'A spot I am booked for';
                    }

                    return viewModelRow;
                });

                if (this.viewModel.spots.length > 0) {
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
