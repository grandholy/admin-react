import React from 'react';
import { Form, DatePicker, TimePicker, Typography, Card, Row, Col, Input, Calendar } from 'antd';
import dayjs from 'dayjs'; // Import Day.js

const { Title } = Typography;

const PickerForm: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Picker Form</Title>
            <Form layout="vertical">
                <Row gutter={16}>
                    {/* Basic Date Picker */}
                    <Col span={8}>
                        <Card title="Basic Date Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Date Time Picker */}
                    <Col span={8}>
                        <Card title="Date Time Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <DatePicker showTime style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Basic Time Picker */}
                    <Col span={8}>
                        <Card title="Basic Time Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <TimePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Inline Time Picker */}
                    <Col span={8}>
                        <Card title="Inline Time Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <TimePicker style={{ width: '100%' }} format="hh:mm A" />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Date Range Picker */}
                    <Col span={8}>
                        <Card title="Date Range Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Color Picker using Input type="color" */}
                    <Col span={8}>
                        <Card title="Color Picker" style={{ marginBottom: '20px' }}>
                            <Form.Item label="Select Color">
                                <Input type="color" style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Inline Calendar */}
                    <Col span={8}>
                        <Card title="Inline Calendar" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <Calendar fullscreen={false} style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* Preloading Time */}
                    <Col span={8}>
                        <Card title="Preloading Time" style={{ marginBottom: '20px' }}>
                            <Form.Item>
                                <TimePicker defaultValue={dayjs('13:45', 'HH:mm')} style={{ width: '100%' }} />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default PickerForm;
