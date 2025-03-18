import React from 'react';
import { Form, Input, Button, Typography, Space, Card, Row, Col } from 'antd';

const { Title } = Typography;

const FormElements: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Form Elements</Title>
            <Form layout="vertical">
                <Row gutter={16}>
                    {/* Basic Inputs */}
                    <Col span={8}>
                        <Card title="Basic Inputs" style={{ marginBottom: '20px' }}>
                            <Input placeholder="Basic input" style={{ marginBottom: '10px' }} />
                            <Input.TextArea placeholder="Basic textarea" style={{ marginBottom: '10px' }} />
                        </Card>
                    </Col>

                    {/* Inputs With Placeholder */}
                    <Col span={8}>
                        <Card title="Inputs With Placeholder" style={{ marginBottom: '20px' }}>
                            <Input placeholder="This is placeholder" style={{ marginBottom: '10px' }} />
                            <Input.TextArea placeholder="This is a textarea placeholder" style={{ marginBottom: '10px' }} />
                        </Card>
                    </Col>

                    {/* Readonly Inputs */}
                    <Col span={8}>
                        <Card title="Readonly Inputs" style={{ marginBottom: '20px' }}>
                            <Input readOnly value="Readonly input" style={{ marginBottom: '10px' }} />
                        </Card>
                    </Col>

                    {/* Input With Label */}
                    <Col span={8}>
                        <Card title="Input With Label" style={{ marginBottom: '20px' }}>
                            <Form.Item label="Email">
                                <Input placeholder="Email" style={{ marginBottom: '10px' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Input With Helper Text */}
                    <Col span={8}>
                        <Card title="Input With Helper text" style={{ marginBottom: '20px' }}>
                            <Input placeholder="Email" style={{ marginBottom: '10px' }} />
                            <span>We'll never share your details.</span>
                        </Card>
                    </Col>

                    {/* Input With Corner Hint */}
                    <Col span={8}>
                        <Card title="Input With Corner Hint" style={{ marginBottom: '20px' }}>
                            <Input placeholder="Email" style={{ marginBottom: '10px' }} />
                            <span style={{ float: 'right' }}>Optional</span>
                        </Card>
                    </Col>

                    {/* Input Sizes */}
                    <Col span={8}>
                        <Card title="Input Sizes" style={{ marginBottom: '20px' }}>
                            <Space direction="vertical">
                                <Input size="small" placeholder="Small size" style={{ marginBottom: '10px' }} />
                                <Input placeholder="Default size" style={{ marginBottom: '10px' }} />
                                <Input size="large" placeholder="Large size" />
                            </Space>
                        </Card>
                    </Col>

                    {/* Input Validation States */}
                    <Col span={8}>
                        <Card title="Input Validation states" style={{ marginBottom: '20px' }}>
                            <Form.Item
                                name="email1"
                                label="Email"
                                rules={[{ type: 'email', message: 'Please enter a valid email address.' }]}
                                validateStatus="error"
                                help="Please enter a valid email address."
                            >
                                <Input className="danger" placeholder="Email" style={{ marginBottom: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                name="email2"
                                label="Email"
                                rules={[{ type: 'email', message: 'Please enter a valid email address.' }]}
                                validateStatus="success"
                                help="Looks good!"
                            >
                                <Input className="success" placeholder="Email" style={{ marginBottom: '10px' }} />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>

                <Button type="primary">Submit</Button>
            </Form>
        </div>
    );
};

export default FormElements;
