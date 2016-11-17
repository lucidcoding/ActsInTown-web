import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IConfigService } from '../config/iconfig.service';
import { ConfigServiceToken } from '../config/config.service';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { UserType } from './responses/userType.response';

@Injectable()
export class UserTypeService {
	constructor( 
			@Inject(CustomHttpService) private http: Http,
			@Inject(ConfigServiceToken) private configService: IConfigService) {
	}

	get(): Observable<UserType[]> {
		return this.http.get(this.configService.getApiBaseUrl() + 'usertype')
        	.map(response => response.json());
	}
    
    getForCurrentUser(): Observable<UserType[]> {
		return this.http.get(this.configService.getApiBaseUrl() + 'usertype/for-current-user')
        	.map(response => response.json());
	}
}
