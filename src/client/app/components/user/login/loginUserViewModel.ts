import { ElementState } from '../../../common/elementState';

export class LoginUserViewModel {
	email: string;
	password: string;
	rememberMe: boolean;
	failedLogin: boolean;
    elementState: ElementState;
}
