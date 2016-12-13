import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { RegisterUserRequest } from './requests/register.user.request';
import { EditUserRequest } from './requests/editUserRequest';
import { ChangePasswordRequest } from './requests/changePasswordRequest';
import { InitializePasswordResetRequest } from './requests/initializePasswordResetRequest';
import { ResetPasswordRequest } from './requests/resetPasswordRequest';
import { User } from './responses/user';

//https://angular.io/docs/ts/latest/guide/server-communication.html
//https://auth0.com/blog/angular-2-series-part-3-using-http/
//https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.44j8a6i28

@Injectable()
export class UserService {
	constructor(
			private http: CustomHttpService,
            private standardHttp: Http,
			private configService: ConfigService) {
	}

	register(request: RegisterUserRequest): Observable<Response> {
		return this.http.post(this.configService.getApiBaseUrl() + 'user/register', request, null);
    }
    
	verify(verificationToken: string): Observable<Response> {
		return this.http.get(this.configService.getApiBaseUrl() + 'user/verify?verificationToken=' + verificationToken);
    }
    
    editCurrent(request: EditUserRequest): Observable<Response> {
		return this.http.put(this.configService.getApiBaseUrl() + 'user/edit-current/', request, null);
	}
    
    getCurrent(): Observable<User> {
        return this.http.get(this.configService.getApiBaseUrl() + 'user/current')
        	.map(response => response.json());
    }
    
    changePassword(request: ChangePasswordRequest): Observable<Response> {
		return this.http.put(this.configService.getApiBaseUrl() + 'user/change-password', request, null);
	}
    
    initializePasswordReset(request: InitializePasswordResetRequest): Observable<Response> {
		return this.standardHttp.put(this.configService.getApiBaseUrl() + 'user/initialize-password-reset', request, null);
    }
    
    resetPassword(request: ResetPasswordRequest): Observable<Response> {
		return this.standardHttp.put(this.configService.getApiBaseUrl() + 'user/reset-password', request, null);
    }
}
