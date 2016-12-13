import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CustomHttpService } from '../customHttp/customHttp.service';
import { ConfigService } from '../config/config.service';
import { AddSpotRequest } from './requests/add.spot.request';
import { EnquireAboutSpotRequest } from './requests/enquireAboutSpotRequest';
import { Spot } from './responses/spot.response';

//custom http for security and headers?
//http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2

@Injectable()
export class SpotService {
	constructor(
			private http: CustomHttpService,
			private configService: ConfigService) {
	}

	add(request: AddSpotRequest): Observable<Response> {
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
    
    delete(id: string): Observable<Response> {
		return this.http.delete(this.configService.getApiBaseUrl() + 'spot/' + id, null);
    }
    
    enquireAbout(id: string, request: EnquireAboutSpotRequest): Observable<Response> {
        return this.http.put(this.configService.getApiBaseUrl() + 'spot/enquire-about/' + id, request, null);
    }
}
