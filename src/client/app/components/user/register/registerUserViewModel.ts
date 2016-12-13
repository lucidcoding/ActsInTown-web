import { Option } from '../../../common/option.common';
import { ElementState } from '../../../common/elementState';

export class RegisterUserViewModel {
	userTypes: Option[];
	userTypeSelected: boolean;
	email: string;
	alreadyRegistered: boolean;
	password: string;
    //passwordPattern: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	stageName: string;
    elementState: ElementState;
}
