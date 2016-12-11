import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSpotViewModel } from './addSpotViewModel';
import { AddSpotRequest } from '../../../services/spot/requests/add.spot.request';
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

    constructor(private spotService: SpotService,
                private townService: TownService,
                private router: Router) {
        var date = new Date();
        date = date.roundUpTime();
        
        this.viewModel = {
            scheduledFor: date,
            durationMinutes: null,
            durationMinutesOptions: [],
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
                this.viewModel.elementState = ElementState.Ready;
            },
            error => {
                this.viewModel.elementState = ElementState.LoadingError;
            },
            () => {
                //
            });
    }

    onNotify(ev:any) {
        console.log(ev);
    }
    
    durationMinutesChanged(value: string) {
        if(value === 'null') {
            this.viewModel.durationMinutes = null;
        } else {
            this.viewModel.durationMinutes = parseInt(value);
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
            description: this.viewModel.description
        };

        this.spotService.add(request)
            .subscribe(
            response => {
                this.viewModel.elementState = ElementState.Ready;
                this.router.navigate(['spot/list']);
            },
            error => {
                if(error.status === 400) {
                    this.viewModel.elementState = ElementState.Ready;
                    var body = JSON.parse(error._body);
                    this.viewModel.validationErrors = body.map(validationError => validationError.text);
                } else {
                    this.viewModel.elementState = ElementState.SubmissionError;
                }
            },
            () => {
                //
            });
    }
}
