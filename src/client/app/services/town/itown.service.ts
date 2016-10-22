import { Observable } from 'rxjs/Observable';
import { Town } from './responses/town.response';

export interface ITownService {
	get(): Observable<Town[]>;
}
