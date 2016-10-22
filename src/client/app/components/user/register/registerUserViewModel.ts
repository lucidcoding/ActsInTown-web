import { Option } from '../../../common/option.common';

export class RegisterUserViewModel {
	userTypes: Option[];
	userTypeSelected: boolean;
	email: string;
	alreadyRegistered: boolean;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	stageName: string;
}
