import { Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AddSpotComponent } from '../../../components/spot/add/addSpotComponent';
import { DateTimeSelectorModule } from '../../../components/shared/dateTimeSelector/dateTimeSelectorModule';
import { SpotService } from '../../../services/spot/spot.service';
import { TownService } from '../../../services/town/town.service';
import { AddSpotRequest } from '../../../services/spot/requests/add.spot.request';

export function main() {
    var mockSpotService: any;
    var mockTownService: any;
    var mockRouter: any;
    var addSpotRequest: AddSpotRequest;

    describe('For addSpotComponent', () => {
        beforeEach(() => {
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
        
        /*describe('Calling onSubmit() with valid form', () => {
            it('should submit registration request.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(RegisterUserComponent);
                        let component = fixture.debugElement.componentInstance;

                        registerUserRequest = null;

                        component.viewModel = {
                            email: 'richard.red@redcompany.com',
                            password: 'Red12345!',
                            confirmPassword: 'Red12345!',
                            firstName: 'Richard',
                            lastName: 'Red',
                            stageName: 'Redman',
                            userTypes: [
                                { value: 'UT_001', text: 'User Type 01', selected: false },
                                { value: 'UT_002', text: 'User Type 02', selected: true },
                                { value: 'UT_003', text: 'User Type 03', selected: false },
                                { value: 'UT_004', text: 'User Type 04', selected: true }
                            ],
                        };
                
                        let registerUserForm = {
                            valid: true,
                        };

                        component.onSubmit(registerUserForm);
                        expect(mockAuthenticationService.clearToken).toHaveBeenCalled();
                        expect(mockUserService.register).toHaveBeenCalled();
                        expect(registerUserRequest).not.toBeNull();
                        expect(registerUserRequest.username).toEqual('richard.red@redcompany.com');
                        expect(registerUserRequest.password).toEqual('Red12345!');
                        expect(registerUserRequest.confirmPassword).toEqual('Red12345!');
                        expect(registerUserRequest.firstName).toEqual('Richard');
                        expect(registerUserRequest.lastName).toEqual('Red');
                        expect(registerUserRequest.stageName).toEqual('Redman');
                        expect(registerUserRequest.userTypeIds).toEqual(['UT_002', 'UT_004']);
                        expect(mockRouter.navigate).toHaveBeenCalledWith(['user/register-success']);
                    });
            }));
        });
        
        describe('Calling onSubmit() with invalid form', () => {
            it('should not submit registration request.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(RegisterUserComponent);
                        let component = fixture.debugElement.componentInstance;
                        component.onSubmit({ valid: false });
                        expect(mockAuthenticationService.clearToken).not.toHaveBeenCalled();
                        expect(mockUserService.register).not.toHaveBeenCalled();
                        expect(mockRouter.navigate).not.toHaveBeenCalled();
                    });
            }));
        });*/
    });
}
