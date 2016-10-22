import { Observable } from 'rxjs/Observable';
import { AddSpotRequest } from './requests/add.spot.request';
import { Spot } from './responses/spot.response';

export interface ISpotService {
	add(request: AddSpotRequest): Observable<any>;
    getForCurrentUser(): Observable<Spot[]>;
    search(startDate: Date, endDate: Date, townId: string, bookedState: string): Observable<Spot[]>;
}
