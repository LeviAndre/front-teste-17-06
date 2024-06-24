import BaseRequest from "../BaseRequest";
import { TicketDto, TicketResponseDto } from "./dtos/TicketDto";

export class TicketApi extends BaseRequest {
    constructor() {
        super("/tickets")
    }

    public async create(ticket: TicketDto) {
        await this._req.post('/login', ticket);
    }

    public async find(id: number): Promise<TicketResponseDto> {
        const response = await this._req.get<TicketResponseDto>(`find/${id}`);

        return response as unknown as TicketResponseDto;
    } 

    public async findAll(): Promise<TicketResponseDto[]> {
        const response = await this._req.get<TicketResponseDto[]>('find/all');

        return response as unknown as TicketResponseDto[];
    } 
}