import BaseRequest from "../BaseRequest";
import { AuthDto, AuthenticatedDto, RegisterDto } from "./dtos/AuthDto";

export class AuthApi extends BaseRequest {
    constructor() {
        super("/auth")
    }

    public async login(auth: AuthDto): Promise<AuthenticatedDto> {
        const response = await this._req.post<AuthenticatedDto>('/login', auth);

        return response as unknown as AuthenticatedDto;
    }

    public async register(register: RegisterDto): Promise<AuthenticatedDto> {
        const response = await this._req.post<AuthenticatedDto>('/register', register);

        return response as unknown as AuthenticatedDto;
    }
}