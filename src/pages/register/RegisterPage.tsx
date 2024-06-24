import { Button, Card, Checkbox, Col, Flex, Form, FormProps, Input, Row, message } from "antd";
import Title from "antd/es/typography/Title";
import { LoginOutlined } from '@ant-design/icons';
import { AuthApi } from "../../services/auth/AuthApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const _api = new AuthApi();
    const _navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    type FieldType = {
        firstName: string;
        lastName: string;
        email?: string;
        password?: string;
    };
      
    const postAuth: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setIsLoading(true);

            await _api.register({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email!,
                password: values.password!
            })

            messageApi.open({
                type: 'success',
                content: 'Registration successful!',
            });

            _navigate('/auth')
        } catch (ex: any) {
            const errorResponse = ex.response.data;

            messageApi.open({
                type: 'error',
                content: errorResponse.title,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Row style={{ width: '100%', height: '100vh' }}>
                <Flex align="center" justify="center" style={{ width: '100%', height: '100vh' }}>
                    <Col span={8}>
                        <Card>
                            <Title level={3} style={{ textAlign: 'center', marginBottom: 35 }}>
                                REGISTER
                            </Title>
                            <Form
                                name="layout-multiple-vertical"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={postAuth}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                layout="vertical"
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item<FieldType>
                                layout="vertical"
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item<FieldType>
                                layout="vertical"
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                layout="vertical"
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button icon={<LoginOutlined />} loading={isLoading} type="primary" htmlType="submit" style={{width: '100%', margin: '5px 0'}}>
                                        Submit
                                    </Button>
                                    <Button type="default" href="/auth" style={{width: '100%', margin: '5px 0'}}>
                                        Already have an account?
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Flex>
            </Row>
        </>
    );
}

export default RegisterPage;