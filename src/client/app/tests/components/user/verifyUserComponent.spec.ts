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

import { TestBed } from '@angular/core/testing';
//import { async } from '@angular/core/testing';
//import { ActivatedRoute } from '@angular/router';
import { VerifyUserComponent } from '../../../components/user/verify/verifyUserComponent';
//import { UserService } from '../../../services/user/user.service';
import { TestService } from '../../../services/testService';

/*var mockActivatedRoute = {
    
};*/

//var mockUserService = {
//};
/*	register(request: RegisterUserRequest): Observable<any> {
		return this.http.post(this.configService.getApiBaseUrl() + 'user/register', request, null);
	}
	
	login(request: LoginUserRequest): Observable<any> {
        var url = this.configService.getApiBaseUrl() + 'token?username=' + 
            encodeURIComponent(request.username) + '&password=' + encodeURIComponent(request.password);
            
		return this.http.get(url);
	}
    
	verify(verificationToken: string): Observable<any> {
		return this.http.get(this.configService.getApiBaseUrl() + 'user/verify?verificationToken=' + verificationToken);
    }
};*/

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
                    //{ provide: UserService, useClass: mockUserService }
                    { provide: TestService, useClass: MockTestService }
                    //UserService
                ]
            });

        });

        it('should have name property set', function() {
            console.log('step 1');
            TestBed
                .compileComponents()
                .then(() => {
                    console.log('step 1');
                    let fixture = TestBed.createComponent(VerifyUserComponent);
                    console.log('step 2');
                    fixture.detectChanges();
                    console.log('step 3');
                    //expect(true).toBe(true);
                });
        });
        /*it('should work',
            async(() => {
                TestBed
                    .compileComponents()
                    .then(() => {
                        console.log('step 1');
                        //let fixture = TestBed.createComponent(VerifyUserComponent);
                        //console.log('step 2');
                        //fixture.detectChanges();
                        //console.log('step 3');

                        let homeInstance = fixture.debugElement.children[0].componentInstance;
                        let homeDOMEl = fixture.debugElement.children[0].nativeElement;

                        expect(homeInstance.nameListService).toEqual(jasmine.any(NameListService));
                        expect(homeDOMEl.querySelectorAll('li').length).toEqual(0);

                        homeInstance.newName = 'Minko';
                        homeInstance.addName();

                        fixture.detectChanges();

                        expect(homeDOMEl.querySelectorAll('li').length).toEqual(1);
                        expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Minko');
                    });
            }));*/
    });

}
