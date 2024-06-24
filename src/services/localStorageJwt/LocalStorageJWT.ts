export class LocalStorageJWT {
    private static readonly tokenKey: string = 'token';

    public setToken(token: string): void {
        localStorage.setItem(LocalStorageJWT.tokenKey, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(LocalStorageJWT.tokenKey);
    }

    public removeToken(): void {
        localStorage.removeItem(LocalStorageJWT.tokenKey);
    }
}