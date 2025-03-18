import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  Card,
  Typography,
  Divider,
  Row,
  Col,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Upload,
  message,
  InputNumber,
  Collapse,
  Switch,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';
import type { RcFile } from 'antd/es/upload';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const AdvancedForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Form values:', values);
    
    // Simulate API call
    setTimeout(() => {
      message.success('Biểu mẫu đã được gửi thành công!');
      setLoading(false);
      // Optional: Reset form
      // form.resetFields();
    }, 1500);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // File upload configuration
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ hỗ trợ tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Kích thước hình ảnh phải nhỏ hơn 2MB!');
    }
    return false; // Return false to prevent auto upload
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Card bordered={false}>
        <Title level={2}>Biểu mẫu nâng cao</Title>
        <Text>Vui lòng điền đầy đủ thông tin theo các mục bên dưới.</Text>
        
        <Divider />
        
        <Form
          form={form}
          name="advanced_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
          initialValues={{
            prefix: '+84',
            payment_method: 'credit_card',
            notifications: ['email'],
            sendUpdates: true,
            addresses: [{ address: '', city: '', country: '' }],
          }}
        >
          <Collapse 
            defaultActiveKey={['1']} 
            expandIconPosition="end"
            style={{ marginBottom: 24, background: colors.background }}
          >
            <Panel header="Thông tin cá nhân" key="1">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                  >
                    <Input placeholder="example@domain.com" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Row>
                    <Col span={7}>
                      <Form.Item
                        name="prefix"
                        label="Mã vùng"
                      >
                        <Select style={{ width: '100%', paddingRight: '5px' }}>
                          <Option value="+84">+84</Option>
                          <Option value="+1">+1</Option>
                          <Option value="+44">+44</Option>
                          <Option value="+86">+86</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={17}>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          { required: true, message: 'Vui lòng nhập số điện thoại!' },
                          { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số!' },
                        ]}
                      >
                        <Input placeholder="Số điện thoại" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="dateOfBirth"
                    label="Ngày sinh"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <Form.Item
                    name="bio"
                    label="Giới thiệu bản thân"
                  >
                    <TextArea
                      placeholder="Viết mô tả ngắn về bản thân"
                      autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <Form.Item
                    name="avatar"
                    label="Ảnh đại diện"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      beforeUpload={beforeUpload}
                      maxCount={1}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Tải lên</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
            
            <Panel header="Địa chỉ liên hệ" key="2">
              <Form.List name="addresses">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ marginBottom: 16, border: '1px dashed #d9d9d9', padding: 16, borderRadius: 4 }}>
                        <Row gutter={16}>
                          <Col xs={24} md={16}>
                            <Form.Item
                              {...restField}
                              name={[name, 'address']}
                              label="Địa chỉ"
                              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            >
                              <Input placeholder="Số nhà, tên đường..." />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'city']}
                              label="Thành phố"
                              rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
                            >
                              <Input placeholder="Thành phố" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'province']}
                              label="Tỉnh/Thành"
                            >
                              <Input placeholder="Tỉnh/Thành" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'zipCode']}
                              label="Mã bưu chính"
                            >
                              <Input placeholder="Mã bưu chính" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'country']}
                              label="Quốc gia"
                              rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}
                            >
                              <Select placeholder="Chọn quốc gia">
                                <Option value="vietnam">Việt Nam</Option>
                                <Option value="usa">Hoa Kỳ</Option>
                                <Option value="china">Trung Quốc</Option>
                                <Option value="japan">Nhật Bản</Option>
                                <Option value="korea">Hàn Quốc</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button 
                          type="text" 
                          danger
                          icon={<MinusCircleOutlined />} 
                          onClick={() => remove(name)}
                          disabled={fields.length === 1}
                        >
                          Xóa địa chỉ này
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={() => add()} 
                        block 
                        icon={<PlusOutlined />}
                      >
                        Thêm địa chỉ mới
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Panel>
            
            <Panel header="Phương thức thanh toán" key="3">
              <Form.Item
                name="payment_method"
                label="Chọn phương thức thanh toán"
                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
              >
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="credit_card">Thẻ tín dụng/Ghi nợ</Radio>
                    <Radio value="bank_transfer">Chuyển khoản ngân hàng</Radio>
                    <Radio value="e_wallet">Ví điện tử</Radio>
                    <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => 
                  prevValues.payment_method !== currentValues.payment_method
                }
              >
                {({ getFieldValue }) => {
                  const paymentMethod = getFieldValue('payment_method');
                  
                  if (paymentMethod === 'credit_card') {
                    return (
                      <div style={{ marginLeft: 22 }}>
                        <Row gutter={16}>
                          <Col xs={24}>
                            <Form.Item
                              name="card_number"
                              label="Số thẻ"
                              rules={[
                                { required: true, message: 'Vui lòng nhập số thẻ!' },
                                { pattern: /^[0-9]{16}$/, message: 'Số thẻ không hợp lệ!' }
                              ]}
                            >
                              <Input placeholder="1234 5678 9012 3456" maxLength={16} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="card_name"
                              label="Tên chủ thẻ"
                              rules={[{ required: true, message: 'Vui lòng nhập tên chủ thẻ!' }]}
                            >
                              <Input placeholder="NGUYEN VAN A" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item
                              name="expiry_date"
                              label="Ngày hết hạn"
                              rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
                            >
                              <Input placeholder="MM/YY" />
                            </Form.Item>
                          </Col>
                          <Col xs={12} md={6}>
                            <Form.Item
                              name="cvv"
                              label={
                                <span>
                                  CVV
                                  <Tooltip title="Mã bảo mật 3 số ở mặt sau thẻ">
                                    <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                  </Tooltip>
                                </span>
                              }
                              rules={[
                                { required: true, message: 'Vui lòng nhập CVV!' },
                                { pattern: /^[0-9]{3,4}$/, message: 'CVV không hợp lệ!' }
                              ]}
                            >
                              <Input placeholder="123" maxLength={4} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    );
                  }
                  
                  if (paymentMethod === 'bank_transfer') {
                    return (
                      <div style={{ marginLeft: 22 }}>
                        <Form.Item
                          name="bank_name"
                          label="Tên ngân hàng"
                          rules={[{ required: true, message: 'Vui lòng chọn ngân hàng!' }]}
                        >
                          <Select placeholder="Chọn ngân hàng">
                            <Option value="vietcombank">Vietcombank</Option>
                            <Option value="techcombank">Techcombank</Option>
                            <Option value="bidv">BIDV</Option>
                            <Option value="agribank">Agribank</Option>
                            <Option value="vietinbank">Vietinbank</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    );
                  }
                  
                  if (paymentMethod === 'e_wallet') {
                    return (
                      <div style={{ marginLeft: 22 }}>
                        <Form.Item
                          name="wallet_type"
                          label="Loại ví điện tử"
                          rules={[{ required: true, message: 'Vui lòng chọn ví điện tử!' }]}
                        >
                          <Select placeholder="Chọn ví điện tử">
                            <Option value="momo">MoMo</Option>
                            <Option value="zalopay">ZaloPay</Option>
                            <Option value="vnpay">VnPay</Option>
                            <Option value="paypal">PayPal</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    );
                  }
                  
                  return null;
                }}
              </Form.Item>
            </Panel>
            
            <Panel header="Cài đặt khác" key="4">
              <Form.Item
                name="notifications"
                label="Nhận thông báo qua"
              >
                <Checkbox.Group options={[
                  { label: 'Email', value: 'email' },
                  { label: 'SMS', value: 'sms' },
                  { label: 'Push Notification', value: 'push' },
                ]} />
              </Form.Item>
              
              <Form.Item
                name="sendUpdates"
                label="Nhận bản tin và cập nhật"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="language"
                label="Ngôn ngữ ưa thích"
              >
                <Select placeholder="Chọn ngôn ngữ">
                  <Option value="vi">Tiếng Việt</Option>
                  <Option value="en">English</Option>
                  <Option value="fr">Français</Option>
                  <Option value="de">Deutsch</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="additional_notes"
                label="Ghi chú thêm"
              >
                <TextArea
                  placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt..."
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </Form.Item>
            </Panel>
          </Collapse>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" size="large" loading={loading}>
                Gửi biểu mẫu
              </Button>
              <Button htmlType="button" size="large" onClick={() => form.resetFields()}>
                Làm mới
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdvancedForm; 