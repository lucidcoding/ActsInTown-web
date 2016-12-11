import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchSpotsViewModel } from './searchSpotsViewModel';
import { TownService } from '../../../services/town/town.service';
import { ElementState } from '../../../common/elementState';
import { BookedState } from '../../../common/bookedState';

@Component({
    moduleId: module.id,
    selector: 'sd-search-spots',
    templateUrl: 'searchSpotsComponent.html',
    styleUrls: ['searchSpotsComponent.css']
})
export class SearchSpotsComponent implements OnInit, OnDestroy {
    public viewModel: SearchSpotsViewModel;
    private sub: any;

    constructor(private activatedRoute: ActivatedRoute,
                private townService: TownService,
                private router: Router) {
        var date = new Date();
        date = date.roundUpTime();
        
        this.viewModel = {
            bookedState: null,
            startDate: date,
            endDate: date,
            townId: null,
            townOptions: [],
            townOptionsLoaded: false,
            elementState: ElementState.Ready
        };
    }

    public ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            if (params['bookedState'] === 'available') {
                this.viewModel.bookedState = BookedState.Available;
            } else if (params['bookedState'] === 'booked') {
                this.viewModel.bookedState = BookedState.Booked;
            }
        });
        
        this.townService.get()
            .subscribe(
            response => {
                this.viewModel.townOptions = response.map(town => {
                    return new Option(town.name, town.id, false);
                });

                this.viewModel.townOptions.splice(0, 0, new Option('Please select...', null, true));
                this.viewModel.townOptionsLoaded = true;
                this.viewModel.elementState = ElementState.Ready;
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //Do nothing.
            });
    }

    onSubmit(searchAvailableSpotsForm: any) {
        this.router.navigate(['spot/search-results'], {
            queryParams: {
                startDate: this.viewModel.startDate,
                endDate: this.viewModel.endDate,
                townId: this.viewModel.townId
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
