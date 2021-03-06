import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSpotViewModel } from './addSpotViewModel';
import { AddSpotRequest } from '../../../services/spot/requests/add.spot.request';
import { CountyService } from '../../../services/county/countyService';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';
import '../../../common/dateExtensions';

@Component({
    moduleId: module.id,
    selector: 'sd-add-spot',
    templateUrl: 'addSpotComponent.html',
    styleUrls: ['addSpotComponent.css']
})
export class AddSpotComponent implements OnInit {
    public viewModel: AddSpotViewModel;

    constructor(private countyService: CountyService,
                private spotService: SpotService,
                private townService: TownService,
                private router: Router) {
        var date = new Date();
        date = date.roundUpTime();
        
        this.viewModel = {
            bookedState: null,
            bookedStateOptions: [],
            scheduledFor: date,
            durationMinutes: null,
            durationMinutesOptions: [],
            countyId: null,
            countyOptions: [],
            countyOptionsLoaded: false,
            townId: null,
            townOptions: [],
            townOptionsLoaded: false,
            venueName: null,
            description: null,
            elementState: ElementState.Ready,
            validationErrors: null
        };
    }

    public ngOnInit() {         
        for (var durationMinutes: number = 5; durationMinutes <= 60; durationMinutes += 5) {
            this.viewModel.durationMinutesOptions.push(new Option(durationMinutes.toString(), durationMinutes.toString(), false));
        }

        this.viewModel.durationMinutesOptions.splice(0, 0, new Option('Please select...', null, true));

        this.townService.get()
            .subscribe(
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
                //
            });
            
        this.viewModel.bookedStateOptions = [
            new Option('Please select...', null, true),
            new Option('A spot I am booked for', 'booked', false),
            new Option('A spot I have available', 'available', false)
        ];
    }

    onNotify(ev: any) {
        console.log(ev);
    }
    
    durationMinutesChanged(value: string) {
        if(value === 'null') {
            this.viewModel.durationMinutes = null;
        } else {
            this.viewModel.durationMinutes = parseInt(value);
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
    
    onSubmit(addSpotForm: any) {
        if (!addSpotForm.valid) {
            return;
        }

        this.viewModel.elementState = ElementState.Loading;
        this.viewModel.validationErrors = null;

        var request: AddSpotRequest = {
            scheduledFor: this.viewModel.scheduledFor,
            durationMinutes: this.viewModel.durationMinutes,
            townId: this.viewModel.townId,
            venueName: this.viewModel.venueName,
            description: this.viewModel.description,
            bookedState: this.viewModel.bookedState.toUpperCase()
        };

        this.spotService.add(request).subscribe(
            response => {
                this.viewModel.elementState = ElementState.Ready;
                this.router.navigate(['spot/list']);
            },
            error => {
                if(error.status === 400) {
                    this.viewModel.elementState = ElementState.Ready;
                    var body = JSON.parse(error._body);
                    this.viewModel.validationErrors = body.map((validationError: any) => validationError.text);
                } else {
                    this.viewModel.elementState = ElementState.SubmissionError;
                }
            },
            () => {
                //
            });
    }
}
