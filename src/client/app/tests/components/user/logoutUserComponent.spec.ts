import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LogoutUserComponent } from '../../../components/user/logout/logoutUserComponent';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

export function main() {
    var mockAuthenticationService: any;
    var mockRouter: any;

    describe('For logoutUserComponent', () => {
        beforeEach(() => {
            mockAuthenticationService = {
                clearToken: jasmine.createSpy('clearToken')
            };

            mockRouter = {
                navigate: jasmine.createSpy('navigate')
            };

            TestBed.configureTestingModule({
                declarations: [LogoutUserComponent],
                providers: [
                    { provide: AuthenticationService, useValue: mockAuthenticationService },
                    { provide: Router, useValue: mockRouter }
                ]
            });
        });

        describe('Calling ngOnInit()', () => {
            it('should call clearToken().', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(LogoutUserComponent);
                        fixture.detectChanges();
                        //let component = fixture.debugElement.componentInstance;
                        expect(mockAuthenticationService.clearToken).toHaveBeenCalled();
                    });
            }));
        });
    });
}
