import { Breadcrumb, Layout, Menu, MenuProps, Table, TableProps, Tag } from "antd";
import Sider from "antd/es/layout/Sider";
import { FileTextOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import React from "react";
import { TicketInterface } from "./ticket-interface/TicketInterface";

const TicketPage = () => {
    const truncateString = (input: string, maxLength: number = 60): string => {
        if (input.length <= maxLength) {
            return input;
        }
        return input.slice(0, maxLength) + '...';
    };

    const navItems: MenuProps['items'] = [
        {
            key: '1',
            icon: <FileTextOutlined />,
            label: `Tickets`,
            children: [
                {
                    key: '1',
                    label: 'List'
                },
                {
                    key: '2',
                    label: 'Create'
                },
            ]
        }
    ];

    const columns: TableProps<TicketInterface>['columns'] = [
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => (
                <>{truncateString(record.description)}</>
            )
        },
        {
            title: 'Status',
            dataIndex: 'statusId',
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
        }
    ];

    const data: TicketInterface[] = [
        {
            id: 1,
            title: 'teste1teste1teste1teste1teste1teste1teste1teste1',
            description: 'desteewe',
            statusId: 2
        },
        {
            id: 2,
            title: 'teste1',
            description: 'desteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewedesteewe',
            statusId: 1
        },
        {
            id: 3,
            title: 'teste1',
            description: 'desteewe',
            statusId: 3
        },
    ]

    return (
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={navItems}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Tickets</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: '100vh',
            }}
          >
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 6 }} />
          </Content>
        </Layout>
      </Layout>
    );
}

export default TicketPage;