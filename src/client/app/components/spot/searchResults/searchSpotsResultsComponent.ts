import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchSpotsResultsViewModel } from './viewModels/searchSpotsResultsViewModel';
import { SpotService } from '../../../services/spot/spot.service';
import { Spot } from '../../../services/spot/responses/spot.response';
import { TownService } from '../../../services/town/town.service';
import { ElementState } from '../../../common/elementState';
import '../../../common/dateExtensions';
import '../../../common/numberExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-search-spots-results',
    templateUrl: 'searchSpotsResultsComponent.html',
    styleUrls: ['searchSpotsResultsComponent.css']
})
export class SearchSpotsResultsComponent implements OnInit, OnDestroy {
    public viewModel: SearchSpotsResultsViewModel;
    public page: number;
    private sub: any;

    constructor(private spotService: SpotService,
        private townService: TownService,
        private route: ActivatedRoute) {
        this.viewModel = {
            bookedState: null,
            startDate: null,
            endDate: null,
            townName: null,
            spots: [],
            spotsState: ElementState.Loading
        };
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            this.viewModel.bookedState = params['bookedState'];
            var startDate: Date = new Date(params['startDate']);
            var endDate: Date = new Date(params['endDate']);
            var townId: string = params['townId'];

            this.spotService.search(startDate, endDate, townId, this.viewModel.bookedState.toUpperCase()).subscribe(
                response => {
                    this.viewModel.spots = response.map((spot: Spot) => {
                        let viewModelRow = {
                            id: spot.id,
                            dateTimeHeading: '',
                            locationHeader: '',
                            username: spot.user.firstName + ' ' + spot.user.lastName
                        };
                    
                        //Seems to be some sort of bug in Angular2 which means I have to do this?
                        let scheduledForAny = <any>spot.scheduledFor;
                        let scheduledFor = new Date(scheduledForAny);

                        viewModelRow.dateTimeHeading =
                            padLeft(scheduledFor.getDate()) + ' ' +
                            scheduledFor.getShortMonthString() + ' ' +
                            scheduledFor.getFullYear() + ' ' +
                            padLeft(scheduledFor.getHours()) + ':' +
                            padLeft(scheduledFor.getMinutes());

                        if (typeof spot.durationMinutes !== 'undefined' && spot.durationMinutes !== null) {
                            viewModelRow.dateTimeHeading = viewModelRow.dateTimeHeading + ', ' +
                                spot.durationMinutes + ' mins';
                        }

                        viewModelRow.locationHeader = '';

                        if (typeof spot.venueName !== 'undefined' && spot.venueName !== null) {
                            viewModelRow.locationHeader = viewModelRow.locationHeader + spot.venueName + ', ';
                        }

                        viewModelRow.locationHeader = viewModelRow.locationHeader + spot.town.name;

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
        });
    }

    enquireAbout(event: any, id: string) { //event is MouseEvent but can't find what package that is in!
        event.preventDefault();

        this.spotService.enquireAbout(id, null).subscribe(
            response => {
                alert('An email has been sent to the user who registered this spot.');
            },
            error => {
                alert('There was an error enquiring about this spot.');
            },
            () => {
                //
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
