import { Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { RegisterUserComponent } from '../../../components/user/register/registerUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';
import { UserTypeService } from '../../../services/userType/userType.service';
import { RegisterUserRequest } from '../../../services/user/requests/register.user.request';

export function main() {
    var mockAuthenticationService: any;
    var mockRouter: any;
    var mockUserService: any;
    var mockUserTypeService: any;
    var registerUserRequest: RegisterUserRequest;

    describe('For registerUserComponent', () => {
        beforeEach(() => {
            mockAuthenticationService = {
                clearToken: jasmine.createSpy('clearToken')
            };

            mockRouter = {
                navigate: jasmine.createSpy('navigate')
            };

            mockUserService = {
                register: jasmine.createSpy('register').and.callFake((args: RegisterUserRequest) => {
                    registerUserRequest = args;
                    return Observable.from([{}]);
                })
            };

            let userTypes = [
                { id: 'UT_001', description: 'User Type 01' },
                { id: 'UT_002', description: 'User Type 02' },
                { id: 'UT_003', description: 'User Type 03' },
                { id: 'UT_004', description: 'User Type 04' }
            ];

            mockUserTypeService = {
                get: jasmine.createSpy('get').and.returnValue(Observable.from([userTypes]))
            };

            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [RegisterUserComponent],
                providers: [
                    { provide: AuthenticationService, useValue: mockAuthenticationService },
                    { provide: Router, useValue: mockRouter },
                    { provide: UserService, useValue: mockUserService },
                    { provide: UserTypeService, useValue: mockUserTypeService }
                ]
            });
        });

        describe('Calling ngOnInit()', () => {
            it('should set userType options.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(RegisterUserComponent);
                        fixture.detectChanges();
                        let component = fixture.debugElement.componentInstance;
                        expect(mockUserTypeService.get).toHaveBeenCalled();
                        expect(component.viewModel.userTypes.length).toEqual(4);
                    });
            }));
        });
        
        describe('Calling onSubmit() with valid form', () => {
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
        });
    });
}
