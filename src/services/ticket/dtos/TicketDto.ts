export interface TicketResponseDto {
    id: number,
    title: string,
    description: string,
    statusId: number,
    userId: number,
    createdAt: Date;
    updatedAt: Date;
}

export interface TicketDto {
    title: string,
    description: string,
}