import React, { ReactNode } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { MenuProps } from 'antd/es/menu';
import { Content } from 'antd/es/layout/layout';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface LayoutBaseProps {
  children: ReactNode;
}

const Navigation: React.FC<LayoutBaseProps> = ({ children }) => {
    const _navigation = useNavigate();

    const navItems: MenuProps['items'] = [
        {
            key: '1',
            icon: <FileTextOutlined />,
            label: `Tickets`,
            children: [
                {
                    key: '1',
                    label: 'List',
                    onClick: () => {
                        _navigation('/')
                    }
                },
                {
                    key: '2',
                    label: 'Create',
                    onClick: () => {
                        _navigation('/create-ticket')
                    }
                },
            ]
        }
    ];

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
          <BreadcrumbItem>Tickets</BreadcrumbItem>
          <BreadcrumbItem>List</BreadcrumbItem>
        </Breadcrumb>
        <Content style={{ padding: 24, margin: 0, minHeight: '100vh' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navigation;
