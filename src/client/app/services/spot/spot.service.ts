import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { ISpotService } from './ispot.service';
import { AddSpotRequest } from './requests/add.spot.request';
import { Spot } from './responses/spot.response';

//custom http for security and headers?
//http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2

@Injectable()
export class SpotService implements ISpotService {
	constructor(
			private http: CustomHttpService,
			private configService: ConfigService) {
	}

	add(request: AddSpotRequest): Observable<any> {
		return this.http.post(this.configService.getApiBaseUrl() + 'spot', request, null);
	}
    
    getForCurrentUser(): Observable<Spot[]> {
        return this.http.get(this.configService.getApiBaseUrl() + 'spot/for-current-user')
        	.map(response => response.json());
    }
    
    search(startDate: Date, endDate: Date, townId: string, bookedState: string): Observable<Spot[]> {
        var queryString = 'startDate=' + encodeURIComponent(startDate.toISOString()) + 
            '&endDate=' + encodeURIComponent(endDate.toISOString()) +
            '&townId=' + encodeURIComponent(townId) + '&bookedState=' + bookedState;
            
        return this.http.get(this.configService.getApiBaseUrl() + 'spot/search?' + queryString)
        	.map(response => response.json());
    }
}

export let SpotServiceToken = new OpaqueToken('SpotServiceToken');
