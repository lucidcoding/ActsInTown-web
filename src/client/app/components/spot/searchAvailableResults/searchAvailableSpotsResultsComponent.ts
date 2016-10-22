import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchAvailableSpotsResultsViewModel } from './viewModels/searchAvailableSpotsResultsViewModel';
import { ISpotService } from '../../../services/spot/ispot.service';
import { SpotServiceToken } from '../../../services/spot/spot.service';
import { ITownService } from '../../../services/town/itown.service';
import { TownServiceToken } from '../../../services/town/town.service';
//import { FutureDateValidator } from '../../../directives/futureDate.directive';

@Component({
    moduleId: module.id,
    selector: 'sd-search-available-spots-results',
    templateUrl: 'searchAvailableSpotsResultsComponent.html',
    styleUrls: ['searchAvailableSpotsResultsComponent.css']
    //,
    //,directives: [FutureDateValidator]
})
export class SearchAvailableSpotsResultsComponent implements OnInit, OnDestroy {
    public viewModel: SearchAvailableSpotsResultsViewModel;
    public page: number;
    private sub: any;

    constructor(
        @Inject(SpotServiceToken) private spotService: ISpotService,
        @Inject(TownServiceToken) private townService: ITownService,
        private route: ActivatedRoute) {

        this.viewModel = {
            startDate: null,
            endDate: null,
            townName: null,
            spots: [],
            spotsLoaded: false
        };


    }

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(params => {
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

                    this.viewModel.spotsLoaded = true;
                },
                error => {
                    console.error('Error: ' + error);
                },
                () => {
                    console.log('Completed!');
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(searchAvailableSpotsForm: any) {
        console.log('');
    }
}
