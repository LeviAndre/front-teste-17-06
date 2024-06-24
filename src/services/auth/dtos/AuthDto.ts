export interface AuthDto {
    email: string,
    password: string
}

export interface RegisterDto {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface AuthenticatedDto {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    token: string
}