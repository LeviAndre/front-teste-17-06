import { Button, Card, Checkbox, Col, Flex, Form, FormProps, Input, Row, message } from "antd";
import Title from "antd/es/typography/Title";
import { LoginOutlined } from '@ant-design/icons';
import { AuthApi } from "../../services/auth/AuthApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageJWT } from "../../services/localStorageJwt/LocalStorageJWT";

const AuthPage = () => {
    const _api = new AuthApi();
    const _localStorage = new LocalStorageJWT();
    const _navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    type FieldType = {
        email?: string;
        password?: string;
    };
      
    const postAuth: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setIsLoading(true);

            const response = await _api.login({
                email: values.email!,
                password: values.password!
            })

            _localStorage.setToken(response.token);

            _navigate("/")
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
                                LOGIN
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
                                    label="Email"
                                    name="email"
                                    required={false}
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    layout="vertical"
                                    label="Password"
                                    name="password"
                                    required={false}
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button icon={<LoginOutlined />} loading={isLoading} type="primary" htmlType="submit" style={{width: '100%', margin: '5px 0'}}>
                                        Submit
                                    </Button>
                                    <Button type="default" href="/register" style={{width: '100%', margin: '5px 0'}}>
                                        Create an accoount
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

export default AuthPage;