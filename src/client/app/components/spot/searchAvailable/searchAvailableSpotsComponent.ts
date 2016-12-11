import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchAvailableSpotsViewModel } from './searchAvailableSpotsViewModel';
import { TownService } from '../../../services/town/town.service';
import { ElementState } from '../../../common/elementState';

@Component({
    moduleId: module.id,
    selector: 'sd-search-available-spots',
    templateUrl: 'searchAvailableSpotsComponent.html',
    styleUrls: ['searchAvailableSpotsComponent.css']
})
export class SearchAvailableSpotsComponent implements OnInit {
    viewModel: SearchAvailableSpotsViewModel;

    constructor(private townService: TownService,
                private router: Router) {
        var date = new Date();
        date = date.roundUpTime();
        
        this.viewModel = {
            startDate: date,
            endDate: date,
            townId: null,
            townOptions: [],
            townOptionsLoaded: false,
            elementState: ElementState.Ready
        };
    }

    public ngOnInit() {
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
        this.router.navigate(['spot/search-available-results'], {
            queryParams: {
                startDate: this.viewModel.startDate,
                endDate: this.viewModel.endDate,
                townId: this.viewModel.townId
            }
        });
    }
}
