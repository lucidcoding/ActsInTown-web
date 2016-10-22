export class RegisterUserRequest {
	username: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	stageName: string;
	userTypeIds: string[];
}
