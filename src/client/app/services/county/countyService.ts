import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { County } from './responses/countyResponse';

@Injectable()
export class CountyService {
	constructor( 
			private http: CustomHttpService,
			private configService: ConfigService) {
	}

	get(): Observable<County[]> {
		return this.http.get(this.configService.getApiBaseUrl() + 'county')
        	.map(response => response.json());
	}
}
