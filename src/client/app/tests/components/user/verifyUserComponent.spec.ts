//import { Component } from '@angular/core';
//import { TestBed } from '@angular/core/testing';
//import { FormsModule } from '@angular/forms';
/*import { ActivatedRoute } from '@angular/router';

import {
//beforeEach,
addProviders ,
describe,
//expect,
//fail,
it,
injectAsync,
TestComponentBuilder
} from '@angular/core/testing';

//import {provide} from 'angular2/core'; 
import { VerifyUserComponent } from '../../../components/user/verify/verifyUserComponent';

class MockActivatedRoute {
    
}

export function main() {
    describe('verifyUserComponent', () => {
        addProviders ([
            { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]);

        it('should get quote', injectAsync(
            [TestComponentBuilder], (tcb) => {
                return tcb.createAsync(VerifyUserComponent).then((fixture) => {
                    console.log();
                });
            }
        ));
    });
}*/
import {
  async
} from '@angular/core/testing';

import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
//import { async } from '@angular/core/testing';
//import { ActivatedRoute } from '@angular/router';
import { VerifyUserComponent } from '../../../components/user/verify/verifyUserComponent';
//import { UserService } from '../../../services/user/user.service';
import { TestService } from '../../../services/testService';
import { UserService } from '../../../services/user/user.service';
import { LoginUserRequest } from '../../../services/user/requests/login.user.request';
import { RegisterUserRequest } from '../../../services/user/requests/register.user.request';

/*var mockActivatedRoute = {
    
};*/

class MockUserService {
	register(request: RegisterUserRequest): Observable<any> {
		return null;
	}
	
	login(request: LoginUserRequest): Observable<any> {
        return null;
	}
    
	verify(verificationToken: string): Observable<any> {
        return null;
    }
};

class MockTestService {
    doThing = function() {
        console.log('mock');
    };
};

export function main() {
    describe('verifyUserComponent', () => {
        beforeEach(() => {
        
            // refine the test module by declaring the test component
            TestBed.configureTestingModule({
                declarations: [VerifyUserComponent],
                providers: [
                    //{ provide: ActivatedRoute, useClass: mockActivatedRoute },
                    { provide: UserService, useClass: MockUserService },
                    { provide: TestService, useClass: MockTestService }
                    //UserService
                ]
            });
        });

        it('should have name property set', 
            async(() => {
                console.log('step 1');
                TestBed
                    .compileComponents()
                    .then(() => {
                        console.log('step 1');
                        let fixture = TestBed.createComponent(VerifyUserComponent);
                        //fixture.someStuff();
                        console.log('step 2');
                        fixture.detectChanges();
                        console.log('step 3');
                        expect(true).toBe(true);
                    });
        }));
    });
}
