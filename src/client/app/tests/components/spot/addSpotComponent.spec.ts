import { Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AddSpotComponent } from '../../../components/spot/add/addSpotComponent';
import { DateTimeSelectorModule } from '../../../components/shared/dateTimeSelector/dateTimeSelectorModule';
import { CountyService } from '../../../services/county/countyService';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { AddSpotRequest } from '../../../services/spot/requests/add.spot.request';

export function main() {
    var mockCountyService: any;
    var mockSpotService: any;
    var mockTownService: any;
    var mockRouter: any;
    var addSpotRequest: AddSpotRequest;

    describe('For addSpotComponent', () => {
        beforeEach(() => {
            let counties = [
                { id: 'C_001', name: 'County 01' },
                { id: 'C_002', name: 'County 02' }
            ];

            mockCountyService = {
                get: jasmine.createSpy('get').and.returnValue(Observable.from([counties]))
            };

            mockSpotService = {
                add: jasmine.createSpy('add').and.callFake((args: AddSpotRequest) => {
                    addSpotRequest = args;
                    return Observable.from([{}]);
                })
            };

            let towns = [
                { id: 'T_001', name: 'Town 01' },
                { id: 'T_002', name: 'Town 02' }
            ];

            mockTownService = {
                get: jasmine.createSpy('get').and.returnValue(Observable.from([towns]))
            };

            mockRouter = {
                navigate: jasmine.createSpy('navigate')
            };

            TestBed.configureTestingModule({
                imports: [DateTimeSelectorModule, FormsModule],
                declarations: [AddSpotComponent],
                providers: [
                    { provide: CountyService, useValue: mockCountyService },
                    { provide: SpotService, useValue: mockSpotService },
                    { provide: TownService, useValue: mockTownService },
                    { provide: Router, useValue: mockRouter }
                ]
            });
        });

        describe('Calling ngOnInit()', () => {
            it('should set town options.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(AddSpotComponent);
                        fixture.detectChanges();
                        let component = fixture.debugElement.componentInstance;
                        expect(mockTownService.get).toHaveBeenCalled();
                        expect(component.viewModel.townOptions.length).toEqual(3);
                    });
            }));
        });

        describe('Calling onSubmit() with valid form', () => {
            it('should submit request.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(AddSpotComponent);
                        let component = fixture.debugElement.componentInstance;

                        addSpotRequest = null;

                        component.viewModel = {
                            scheduledFor: new Date(2020, 10, 5, 20, 30, 0, 0),
                            durationMinutes: 20,
                            durationMinutesOptions: [],
                            townId: 'T_001',
                            townOptions: [],
                            townOptionsLoaded: true,
                            venueName: 'Test Venue 01',
                            bookedState: 'AVAILABLE'
                        };

                        let addSpotForm = {
                            valid: true,
                        };

                        component.onSubmit(addSpotForm);
                        expect(mockSpotService.add).toHaveBeenCalled();
                        expect(addSpotRequest).not.toBeNull();
                        expect(addSpotRequest.scheduledFor).toEqual(new Date(2020, 10, 5, 20, 30, 0, 0));
                        expect(addSpotRequest.durationMinutes).toEqual(20);
                        expect(addSpotRequest.townId).toEqual('T_001');
                        expect(addSpotRequest.venueName).toEqual('Test Venue 01');
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['spot/list']);
                    });
            }));
        });

        describe('Calling onSubmit() with invalid form', () => {
            it('should not submit request.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(AddSpotComponent);
                        let component = fixture.debugElement.componentInstance;
                        component.onSubmit({ valid: false });
                        expect(mockSpotService.add).not.toHaveBeenCalled();
                        expect(mockRouter.navigate).not.toHaveBeenCalled();
                    });
            }));
        });
    });
}
