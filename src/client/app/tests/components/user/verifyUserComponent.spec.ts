import {
    async
    //beforeEach,
    //describe,
    //expect,
    //it
} from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { VerifyUserComponent } from '../../../components/user/verify/verifyUserComponent';
import { UserService } from '../../../services/user/user.service';
//import { LoginUserRequest } from '../../../services/user/requests/login.user.request';
//import { RegisterUserRequest } from '../../../services/user/requests/register.user.request';

/*class MockActivatedRoute {
    
};*/


/*
class MockUserService {
	register(request: RegisterUserRequest): Observable<any> {
		return null;
	}
	
	login(request: LoginUserRequest): Observable<any> {
        return null;
	}
    
	verify(verificationToken: string): jasmine.createSpy('verify');
};*/

/*
var mockActivatedRoute = {
    params: jasmine.createSpy('params').and.returnValue(Observable.from([{ 
        'verificationToken': 'abcd' 
    }]))
};*/

var mockActivatedRoute = {
    params: Observable.from([{ 
        verificationToken: 'abcd' 
    }])
};

var mockUserService = {
    register: jasmine.createSpy('register'),
    login: jasmine.createSpy('login'),
    /*verify: jasmine.createSpy('verify').and.returnValue(
        Observable.from([{ 
            verificationToken: 'abcd' 
        }])
    )*/
    verify: (x: string): Observable<any> => {
        console.log('x:' + x);
        /*return Observable.create(observer => {
            observer.onNext('resp1');
            observer.onError('x');
            observer.onCompleted();
            
            // Any cleanup logic might go here
            return () => console.log('disposed');
        });*/
        return  Observable.from(['efgh']);
    }
};


export function main() {
    describe('verifyUserComponent', () => {
        beforeEach(() => {
        
            // refine the test module by declaring the test component
            TestBed.configureTestingModule({
                declarations: [VerifyUserComponent],
                providers: [
                    { provide: ActivatedRoute, useValue: mockActivatedRoute },
                    //{ provide: ActivatedRoute, useClass: MockActivatedRoute },
                    { provide: UserService, useValue: mockUserService }
                ]
            });
        });

        it('should have name property set', 
            async(() => {
                console.log('step 1');
                TestBed
                    .compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(VerifyUserComponent);
                        fixture.detectChanges();
                        var component = fixture.debugElement.componentInstance;
                        //let homeInstance = fixture.debugElement.children[0].componentInstance;
                        //let homeDOMEl = fixture.debugElement.children[0].nativeElement;
                        var a = component.getSomeStuff();
                        console.log('vt:' + a);
                        fixture.detectChanges();
                        expect(true).toBe(true);
                    });
        }));
    });
}
