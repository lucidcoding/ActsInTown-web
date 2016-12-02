import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { ITownService } from './itown.service';
import { Town } from './responses/town.response';

@Injectable()
export class TownService implements ITownService {
	constructor( 
			private http: CustomHttpService,
			private configService: ConfigService) {
	}

	get(): Observable<Town[]> {
		return this.http.get(this.configService.getApiBaseUrl() + 'town')
        	.map(response => response.json());
	}
}

export let TownServiceToken = new OpaqueToken('TownServiceToken');
