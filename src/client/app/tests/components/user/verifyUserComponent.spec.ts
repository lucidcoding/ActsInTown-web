import { ActivatedRoute } from '@angular/router';
import { async, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { VerifyUserComponent } from '../../../components/user/verify/verifyUserComponent';
import { UserService } from '../../../services/user/user.service';

export function main() {
    var mockActivatedRoute: any;
    var mockUserService: any;

    describe('For verifyUserComponent', () => {
        beforeEach(() => {

            mockActivatedRoute = {
                params: Observable.from([{
                    verificationToken: 'my-verification-token'
                }])
            };

            mockUserService = {
                verify: jasmine.createSpy('verify').and.returnValue(Observable.from([{}]))
            };

            TestBed.configureTestingModule({
                declarations: [VerifyUserComponent],
                providers: [
                    { provide: ActivatedRoute, useValue: mockActivatedRoute },
                    { provide: UserService, useValue: mockUserService }
                ]
            });
        });

        describe('Calling ngOnInit()', () => {
            it('should set verificationSuccessful to true if api call is successful.', async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(VerifyUserComponent);
                        fixture.detectChanges();
                        let component = fixture.debugElement.componentInstance;
                        expect(mockUserService.verify).toHaveBeenCalledWith('my-verification-token');
                        expect(component.verificationSuccessful).toBe(true);
                    });
            }));

            it('should set verificationSuccessful to false if api call is unsuccessful.', async(() => {
                mockUserService.verify = jasmine.createSpy('verify').and.returnValue(Observable.throw('an error'));

                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(VerifyUserComponent);
                        fixture.detectChanges();
                        let component = fixture.debugElement.componentInstance;
                        expect(component.verificationSuccessful).toBe(false);
                    });
            }));
        });
    });
}
