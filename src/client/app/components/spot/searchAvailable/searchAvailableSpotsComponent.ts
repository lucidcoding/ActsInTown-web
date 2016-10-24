import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchAvailableSpotsViewModel } from './searchAvailableSpotsViewModel';
import { TownService } from '../../../services/town/town.service';
//import { FutureDateValidator } from '../../../directives/futureDate.directive';

@Component({
    moduleId: module.id,
    selector: 'sd-search-available-spots',
    templateUrl: 'searchAvailableSpotsComponent.html',
    styleUrls: ['searchAvailableSpotsComponent.css']
    //,
    //,directives: [FutureDateValidator]
})
export class SearchAvailableSpotsComponent implements OnInit {
    viewModel: SearchAvailableSpotsViewModel;

    constructor(private townService: TownService,
        private router: Router) {
        this.viewModel = {
            startDate: null,
            endDate: null,
            townId: null,
            townOptions: [],
            townOptionsLoaded: false
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
            },
            error => {
                console.error('Error: ' + error);
            },
            () => {
                console.log('Completed!');
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
        
        //this.router.navigate(['spot/search-available-results'], {  queryParams: { page: 6 }});
    }
}
