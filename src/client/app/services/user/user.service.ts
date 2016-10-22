import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { IConfigService } from '../config/iconfig.service';
import { ConfigServiceToken } from '../config/config.service';
import { LoginUserRequest } from './requests/login.user.request';
import { RegisterUserRequest } from './requests/register.user.request';

//https://angular.io/docs/ts/latest/guide/server-communication.html
//https://auth0.com/blog/angular-2-series-part-3-using-http/
//https://medium.com/google-developer-experts/angular-2-introduction-to-new-http-module-1278499db2a0#.44j8a6i28

@Injectable()
export class UserService {
	constructor(
			@Inject(CustomHttpService) private http: Http,
			@Inject(ConfigServiceToken) private configService: IConfigService) {
	}

	register(request: RegisterUserRequest): Observable<any> {
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
}

//export let UserServiceToken = new OpaqueToken('UserServiceToken');
