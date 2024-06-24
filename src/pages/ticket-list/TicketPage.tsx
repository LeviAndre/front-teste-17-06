import { Button, Table, TableProps, Tag, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { TicketResponseDto } from "../../services/ticket/dtos/TicketDto";
import { EyeOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from "react";
import { TicketApi } from "../../services/ticket/TicketApi";
import TicketModal from "../../components/ticket/ticket-modal";
import Navigation from "../../components/navigation";
import Title from "antd/es/typography/Title";

const TicketPage = () => {
    const _api = new TicketApi();

    const [tickets, setTicket] = useState<TicketResponseDto[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [actualTicket, setActualTicket] = useState<number | undefined>();
    const [messageApi, contextHolder] = message.useMessage();

    const getTickets = useCallback(async () => {
        try {
            const response = await _api.findAll();

            setTicket(response)
        } catch (ex: any) {
            const errorResponse = ex.response.data;

            messageApi.open({
                type: 'error',
                content: errorResponse.title,
            });
        }
    }, [])

    useEffect(() => {
        getTickets()
    }, [])

    const truncateString = (input: string, maxLength: number = 60): string => {
        if (input.length <= maxLength) {
            return input;
        }
        return input.slice(0, maxLength) + '...';
    };
    
    const columns: TableProps<TicketResponseDto>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <>{truncateString(record.title, 30)}</>
            )
        },
        {
            title: 'Status',
            dataIndex: 'statusId',
            rowScope: 'row',
            key: 'statusId',
            render: (_, record) => {
                switch (record.statusId) {
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
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => {
                const date = new Date(record.createdAt)

                return (
                    <>{date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}</>
                )
            }
        },
        {
            title: 'Show',
            dataIndex: 'statusId',
            key: 'statusId',
            render: (_, record) => (
                <Button type="primary" icon={<EyeOutlined />} onClick={() => {
                    setActualTicket(record.id)
                    setIsOpen(!isOpen)
                }} />
            )
        }
    ];

    return (
        <Navigation>
            {contextHolder}
            <TicketModal isOpen={isOpen} setIsOpen={setIsOpen} ticketId={actualTicket}  />
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    minHeight: '100vh',
                    }}
                >
                    <Title level={3}>Current tickets</Title>
                    <Table columns={columns} dataSource={tickets} pagination={{ pageSize: 6 }} />
                </Content>
        </Navigation>
    );
}

export default TicketPage;