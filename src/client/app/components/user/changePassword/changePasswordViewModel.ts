import { ElementState } from '../../../common/elementState';

export class ChangePasswordViewModel {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    incorrectOldPassword: boolean;
    elementState: ElementState;
}
