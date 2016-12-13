import { ElementState } from '../../../common/elementState';

export class ResetPasswordViewModel {
    passwordResetToken: string;
    email: string;
    password: string;
    confirmPassword: string;
    elementState: ElementState;
}
