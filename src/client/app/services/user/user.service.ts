import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { IConfigService } from '../config/iconfig.service';
import { ConfigServiceToken } from '../config/config.service';
import { LoginUserRequest } from './requests/login.user.request';
import { RegisterUserRequest } from './requests/register.user.request';
import { EditUserRequest } from './requests/editUserRequest';
import { ChangePasswordRequest } from './requests/changePasswordRequest';
import { User } from './responses/user';

//https://angular.io/docs/ts/latest/guide/server-communication.html
//https://auth0.com/blog/angular-2-series-part-3-using-http/
//https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.44j8a6i28

@Injectable()
export class UserService {
	constructor(
            private standardHttp: Http,
			@Inject(CustomHttpService) private http: Http,
			@Inject(ConfigServiceToken) private configService: IConfigService) {
	}

	register(request: RegisterUserRequest): Observable<any> {
		return this.http.post(this.configService.getApiBaseUrl() + 'user/register', request, null);
	}
	
	login(request: LoginUserRequest): Observable<any> {
        let encoded = btoa("my-trusted-client:");
 
        let headers = new Headers({
            "Authorization": "Basic " + encoded,
            "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
        });
        
        let options = new RequestOptions({ headers: headers });
        
        var url = this.configService.getApiBaseUrl() + 'oauth/token?grant_type=password&username=' + 
            encodeURIComponent(request.username) + '&password=' + encodeURIComponent(request.password);
            
		return this.standardHttp.post(url, {}, options);
	}
    
	verify(verificationToken: string): Observable<any> {
		return this.http.get(this.configService.getApiBaseUrl() + 'user/verify?verificationToken=' + verificationToken);
    }
    
    editCurrent(request: EditUserRequest): Observable<any> {
		return this.http.put(this.configService.getApiBaseUrl() + 'user/edit-current/', request, null);
	}
    
    getCurrent(): Observable<User> {
        return this.http.get(this.configService.getApiBaseUrl() + 'user/current')
        	.map(response => response.json());
    }
    
    changePassword(request: ChangePasswordRequest): Observable<any> {
		return this.http.put(this.configService.getApiBaseUrl() + 'user/change-password/', request, null);
	}
}

//export let UserServiceToken = new OpaqueToken('UserServiceToken');
