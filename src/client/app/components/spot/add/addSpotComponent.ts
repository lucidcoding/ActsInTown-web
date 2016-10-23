import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSpotViewModel } from './addSpotViewModel';
import { AddSpotRequest } from '../../../services/spot/requests/add.spot.request';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { Option } from '../../../common/option.common';

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
        this.viewModel = {
            scheduledFor: new Date(),
            durationMinutes: null,
            durationMinutesOptions: [],
            townId: null,
            townOptions: [],
            townOptionsLoaded: false,
            venueName: null
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
            },
            error => console.error('Error: ' + error),
            () => console.log('Completed!'));
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

        var request: AddSpotRequest = {
            scheduledFor: this.viewModel.scheduledFor,
            durationMinutes: this.viewModel.durationMinutes,
            townId: this.viewModel.townId,
            venueName: this.viewModel.venueName
        };

        this.spotService.add(request)
            .subscribe(
            response => {
                this.router.navigate(['spot/list']);
            },
            error => {
                console.log('Error!');
            },
            () => {
                console.log('Completed!');
            });
    }
}
