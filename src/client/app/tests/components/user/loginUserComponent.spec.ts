import { Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { LoginUserComponent } from '../../../components/user/login/loginUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';
import { LoginRequest } from '../../../services/authentication/requests/loginRequest';

export function main() {
    var mockAuthenticationService: any;
    var mockRouter: any;
    var mockUserService: any;
    var loginRequest: LoginRequest;

    let loginResponseBody = {
        access_token: 'access-token-1', 
        refresh_token: 'refresh_token-2',
        expires_in: '2020-12-01T09:00:00.000'
    };

    let loginResponse: any = {
        _body: JSON.stringify(loginResponseBody)
    };

    describe('For loginUserComponent', () => {
        beforeEach(() => {

            mockAuthenticationService = {
                login: jasmine.createSpy('login').and.callFake((args: LoginRequest) => {
                    loginRequest = args;
                    return Observable.from([loginResponse]);
                }),
                setToken: jasmine.createSpy('setToken').and.returnValue(Observable.from([loginResponse]))
            };

            mockRouter = {
                navigate: jasmine.createSpy('navigate')
            };

            mockUserService = {};

            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [LoginUserComponent],
                providers: [
                    { provide: AuthenticationService, useValue: mockAuthenticationService },
                    { provide: UserService, useValue: mockUserService },
                    { provide: Router, useValue: mockRouter },
                ]
            });
        });

        describe('Calling onSubmit() with valid form', () => {
            it('should submit login request and process it.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(LoginUserComponent);
                        let component = fixture.debugElement.componentInstance;

                        loginRequest = null;

                        component.viewModel = {
                            email: 'richard.red@redcompany.com',
                            password: 'Red12345!',
                            rememberMe: false
                        };
                
                        let loginUserForm = {
                            valid: true,
                        };

                        component.onSubmit(loginUserForm);

                        expect(mockAuthenticationService.login).toHaveBeenCalledWith({
                            username: 'richard.red@redcompany.com',
                            password: 'Red12345!',
                            rememberMe: false
                        });

                        expect(loginRequest).not.toBeNull();
                        expect(loginRequest.username).toEqual('richard.red@redcompany.com');
                        expect(loginRequest.password).toEqual('Red12345!');

                        expect(mockAuthenticationService.setToken).toHaveBeenCalledWith(
                            loginResponseBody.access_token,
                            loginResponseBody.refresh_token,
                            loginResponseBody.expires_in);

                        expect(mockRouter.navigate).toHaveBeenCalledWith(['spot/list']);
                    });
            }));
        });
        
        describe('Calling onSubmit() with invalid form', () => {
            it('should not submit login request.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(LoginUserComponent);
                        let component = fixture.debugElement.componentInstance;
                        component.onSubmit({ valid: false });
                        expect(mockAuthenticationService.setToken).not.toHaveBeenCalled();
                        expect(mockAuthenticationService.login).not.toHaveBeenCalled();
                        expect(mockRouter.navigate).not.toHaveBeenCalled();
                    });
            }));
        });
    });
}
