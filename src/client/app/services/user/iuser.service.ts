import { Observable } from 'rxjs/Observable';
import { LoginUserRequest } from './requests/login.user.request';
import { RegisterUserRequest } from './requests/register.user.request';

export interface IUserService {
	register(request: RegisterUserRequest): Observable<any>;
	login(request: LoginUserRequest): Observable<any>;
	verify(verificationToken: string): Observable<any>;
}
