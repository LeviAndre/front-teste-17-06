import { Button, Card, Flex, Modal, Tag, Typography, message } from "antd";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { TicketApi } from "../../../services/ticket/TicketApi";
import { TicketResponseDto } from "../../../services/ticket/dtos/TicketDto";

interface TicketModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    ticketId: number | undefined
}

const TicketModal = ({isOpen, setIsOpen, ticketId}: TicketModalProps) => {
    const _api = new TicketApi()
    
    const [ticket, setTicket] = useState<TicketResponseDto>({} as TicketResponseDto)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage();

    const { Title, Text } = Typography;

    const setStatusTag = (statusId: number) => {
        switch (statusId) {
            case 1:
                return <Tag color="yellow">PENDING</Tag>;
            case 2:
                return <Tag color="blue">IN PROGRESS</Tag>;
            case 3:
                return <Tag color="green">COMPLETED</Tag>;
            default:
                return <Tag color="red">UNKNOWN</Tag>;
        }
    }

    const getTicket = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await _api.find(ticketId!)

            setTicket(response)
        } catch(ex: any) {
            const errorResponse = ex.response.data;

            messageApi.open({
                type: 'error',
                content: errorResponse.title,
            });
        } finally {
            setIsLoading(false)
        }
    }, [ticketId])

    useEffect(() => {
        if (ticketId) getTicket();
    }, [ticketId])

    return (
        <Modal 
            loading={isLoading}
            open={isOpen} 
            onCancel={() => setIsOpen(!isOpen)}
            footer={
                <Button type="primary" onClick={() => setIsOpen(!isOpen)}>
                  Close
                </Button>
              }
            >
            {contextHolder}
            <Flex align="center" justify="space-between" style={{marginTop: 25}}>  
                <Title level={3}>{ticket.title}</Title>
                {setStatusTag(ticket.statusId)}
            </Flex>
            <Card>
                <Flex vertical>
                    <Text style={{fontWeight: 'bold'}}>Description: </Text>
                    <Text>{ticket.description}</Text>                    
                </Flex>
            </Card>
        </Modal>
    )
}

export default TicketModal;