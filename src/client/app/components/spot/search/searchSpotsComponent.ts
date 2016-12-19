import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchSpotsViewModel } from './searchSpotsViewModel';
import { CountyService } from '../../../services/county/countyService';
import { TownService } from '../../../services/town/town.service';
import { ElementState } from '../../../common/elementState';
import '../../../common/dateExtensions';

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
                private countyService: CountyService,
                private townService: TownService,
                private router: Router) {
        var date = new Date();
        date = date.datePart();
        
        this.viewModel = {
            bookedState: null,
            startDate: date,
            endDate: date,
            countyId: null,
            countyOptions: [],
            countyOptionsLoaded: false,
            townId: null,
            townOptions: [],
            townOptionsLoaded: false,
            elementState: ElementState.Ready
        };
    }

    public ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(
            params => {
                this.viewModel.bookedState = params['bookedState'];
            });
        
        this.townService.get().subscribe(
            response => {
                this.viewModel.townOptions = response.map(town => {
                    return new Option(town.name, town.id, false);
                });

                this.viewModel.townOptions.splice(0, 0, new Option('Please select...', null, true));
                this.viewModel.townOptionsLoaded = true;
                
                this.countyService.get().subscribe(
                    response => {
                        this.viewModel.countyOptions = response.map(county => {
                            return new Option(county.name, county.id, false);
                        });
        
                        this.viewModel.countyOptions.splice(0, 0, new Option('Please select...', null, true)); 
                        this.viewModel.countyOptionsLoaded = true;                       
                        this.viewModel.elementState = ElementState.Ready;
                    },
                    error => {
                        this.viewModel.elementState = ElementState.LoadingError;
                    },
                    () => {
                        //Do nothing.
                    });      
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //Do nothing.
            });
    }

    startDateChanged(newStartDate: Date) {
        if (newStartDate > this.viewModel.endDate) {
            this.viewModel.endDate = newStartDate;
        }
    }
    
    filterTowns(countyId: string) {
        this.viewModel.elementState = ElementState.Loading;
        this.viewModel.townOptionsLoaded = false;
        
        if(typeof countyId === 'undefined' || countyId === null || countyId === 'null') {
            this.townService.get().subscribe(
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
        } else {
            this.townService.getForCounty(countyId).subscribe(
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
    }
    
    onSubmit(searchAvailableSpotsForm: any) {
        if (!searchAvailableSpotsForm.valid) {
            return;
        }

        this.viewModel.elementState = ElementState.Loading;
        
        this.router.navigate(['spot/search-results'], {
            queryParams: {
                startDate: this.viewModel.startDate,
                endDate: this.viewModel.endDate,
                townId: this.viewModel.townId,
                bookedState: this.viewModel.bookedState
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
