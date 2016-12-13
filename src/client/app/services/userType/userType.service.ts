import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { UserType } from './responses/userType.response';

@Injectable()
export class UserTypeService {
	constructor( 
			private http: CustomHttpService,
			private configService: ConfigService) {
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
