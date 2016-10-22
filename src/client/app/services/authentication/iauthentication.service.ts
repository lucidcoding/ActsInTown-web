export interface IAuthenticationService {
	setToken(token: string): void;
    clearToken(): void;
    isLoggedIn(): boolean;
}
