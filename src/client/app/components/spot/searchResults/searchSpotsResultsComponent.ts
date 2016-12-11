import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchSpotsResultsViewModel } from './viewModels/searchSpotsResultsViewModel';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { ElementState } from '../../../common/elementState';

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
            startDate: null,
            endDate: null,
            townName: null,
            spots: [],
            spotsState: ElementState.Loading
        };
    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
            console.log('queryParams: ' + params);
            var startDate: Date = new Date(params['startDate']);
            var endDate: Date = new Date(params['endDate']);
            var townId: string = params['townId'];

            this.spotService.search(startDate, endDate, townId, 'AVAILABLE')
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


                    if(this.viewModel.spots.length > 0) {
                        this.viewModel.spotsState = ElementState.Ready;
                    } else {
                        this.viewModel.spotsState = ElementState.NoData;
                    }
                },
                error => {
                    this.viewModel.spotsState = ElementState.LoadingError;
                    console.error('Error: ' + error);
                },
                () => {
                    //
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(searchAvailableSpotsForm: any) {
        //
    }
}
