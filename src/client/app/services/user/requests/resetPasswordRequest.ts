export class ResetPasswordRequest {
    username: string;
    passwordResetToken: string;
    password: string;
    confirmPassword: string;
}