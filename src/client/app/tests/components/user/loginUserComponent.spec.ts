import { Router } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { LoginUserComponent } from '../../../components/user/login/loginUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserService } from '../../../services/user/user.service';
import { LoginUserRequest } from '../../../services/user/requests/login.user.request';

export function main() {
    var mockAuthenticationService: any;
    var mockRouter: any;
    var mockUserService: any;
    var loginUserRequest: LoginUserRequest;
    let sampleToken = 'sampleToken';

    describe('For loginUserComponent', () => {
        beforeEach(() => {
            mockAuthenticationService = {
                setToken: jasmine.createSpy('setToken')
            };

            mockRouter = {
                navigate: jasmine.createSpy('navigate')
            };

            mockUserService = {
                login: jasmine.createSpy('login').and.callFake((args: LoginUserRequest) => {
                    loginUserRequest = args;
                    return Observable.from([{
                        _body: sampleToken
                    }]);
                })
            };

            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [LoginUserComponent],
                providers: [
                    { provide: AuthenticationService, useValue: mockAuthenticationService },
                    { provide: Router, useValue: mockRouter },
                    { provide: UserService, useValue: mockUserService }
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

                        loginUserRequest = null;

                        component.viewModel = {
                            email: 'richard.red@redcompany.com',
                            password: 'Red12345!',
                            rememberMe: false
                        };
                
                        let loginUserForm = {
                            valid: true,
                        };

                        component.onSubmit(loginUserForm);
                        expect(mockUserService.login).toHaveBeenCalled();
                        expect(loginUserRequest).not.toBeNull();
                        expect(loginUserRequest.username).toEqual('richard.red@redcompany.com');
                        expect(loginUserRequest.password).toEqual('Red12345!');
                        expect(mockAuthenticationService.setToken).toHaveBeenCalledWith(sampleToken);
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
                        expect(mockUserService.login).not.toHaveBeenCalled();
                        expect(mockRouter.navigate).not.toHaveBeenCalled();
                    });
            }));
        });
    });
}
