import { Observable } from 'rxjs/Observable';
import { UserType } from './responses/userType.response';

export interface IUserTypeService {
	get(): Observable<UserType[]>;
}
