import { Button, Card, Form, FormProps, Input, message } from "antd";
import Navigation from "../../components/navigation";
import { LoginOutlined } from '@ant-design/icons';
import { TicketApi } from "../../services/ticket/TicketApi";
import { useState } from "react";
import Title from "antd/es/typography/Title";

const TicketCreatePage =  () => {
    const _api = new TicketApi();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    type FieldType = {
        title?: string;
        description?: string;
    };

    const postAuth: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setIsLoading(true);

            await _api.create({
                title: values.title!,
                description: values.description!
            })

            messageApi.open({
                type: 'success',
                content: 'Ticket submited successfully',
            });

            values.title = ""
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
        <Navigation>
            {contextHolder}
            <Card title="Submit your ticket" type="inner">
                <Form
                    name="layout-multiple-vertical"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={postAuth}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        layout="vertical"
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title of your ticket!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        layout="vertical"
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please describe your ticket!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isLoading} type="primary" htmlType="submit" style={{width: '100%', margin: '5px 0'}}>
                            Create ticket
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Navigation>
    )
}

export default TicketCreatePage;