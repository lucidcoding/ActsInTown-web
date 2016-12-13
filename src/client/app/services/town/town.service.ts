import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { Town } from './responses/town.response';

@Injectable()
export class TownService {
	constructor( 
			private http: CustomHttpService,
			private configService: ConfigService) {
	}

	get(): Observable<Town[]> {
		return this.http.get(this.configService.getApiBaseUrl() + 'town')
        	.map(response => response.json());
	}
}
