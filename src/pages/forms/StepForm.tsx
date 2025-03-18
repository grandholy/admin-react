import React, { useState } from 'react';
import { 
  Card, 
  Steps, 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  Space, 
  Typography, 
  Divider, 
  Result, 
  Row, 
  Col,
  InputNumber,
  Radio,
  message
} from 'antd';
import { 
  UserOutlined, 
  SolutionOutlined, 
  CreditCardOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOneForm] = Form.useForm();
  const [stepTwoForm] = Form.useForm();
  const [stepThreeForm] = Form.useForm();
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  
  const { colors } = useTheme();
  
  const steps = [
    {
      title: 'Thông tin cá nhân',
      icon: <UserOutlined />,
    },
    {
      title: 'Thông tin đơn hàng',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Thanh toán',
      icon: <CreditCardOutlined />,
    },
    {
      title: 'Hoàn thành',
      icon: <CheckCircleOutlined />,
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepOneFinish = (values: any) => {
    setFormData({ ...formData, ...values });
    next();
  };

  const handleStepTwoFinish = (values: any) => {
    setFormData({ ...formData, ...values });
    next();
  };

  const handleStepThreeFinish = (values: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormData({ ...formData, ...values });
      setLoading(false);
      next();
    }, 1500);
  };

  const handleReset = () => {
    stepOneForm.resetFields();
    stepTwoForm.resetFields();
    stepThreeForm.resetFields();
    setFormData({});
    setCurrentStep(0);
  };
  
  const renderStepOne = () => {
    return (
      <Form
        form={stepOneForm}
        layout="vertical"
        onFinish={handleStepOneFinish}
        initialValues={formData}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
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
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9+\-\s]+$/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item
              name="city"
              label="Thành phố"
              rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
            >
              <Input placeholder="Thành phố" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item
              name="province"
              label="Tỉnh/Thành"
              rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành!' }]}
            >
              <Input placeholder="Tỉnh/Thành" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item
              name="country"
              label="Quốc gia"
              rules={[{ required: true, message: 'Vui lòng chọn quốc gia!' }]}
            >
              <Select placeholder="Chọn quốc gia">
                <Option value="vietnam">Việt Nam</Option>
                <Option value="usa">Hoa Kỳ</Option>
                <Option value="uk">Anh</Option>
                <Option value="japan">Nhật Bản</Option>
                <Option value="korea">Hàn Quốc</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  const renderStepTwo = () => {
    return (
      <Form
        form={stepTwoForm}
        layout="vertical"
        onFinish={handleStepTwoFinish}
        initialValues={formData}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="product"
              label="Sản phẩm"
              rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
            >
              <Select placeholder="Chọn sản phẩm">
                <Option value="laptop">Laptop</Option>
                <Option value="smartphone">Điện thoại thông minh</Option>
                <Option value="tablet">Máy tính bảng</Option>
                <Option value="accessory">Phụ kiện</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col xs={24}>
            <Form.Item
              name="delivery_date"
              label="Ngày giao hàng dự kiến"
              rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng!' }]}
            >
              <DatePicker style={{ width: '100%' }} placeholder="Chọn ngày" />
            </Form.Item>
          </Col>
          
          <Col xs={24}>
            <Form.Item
              name="delivery_method"
              label="Phương thức giao hàng"
              rules={[{ required: true, message: 'Vui lòng chọn phương thức giao hàng!' }]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="standard">Tiêu chuẩn (3-5 ngày)</Radio>
                  <Radio value="express">Nhanh (1-2 ngày)</Radio>
                  <Radio value="same_day">Cùng ngày</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          
          <Col xs={24}>
            <Form.Item
              name="note"
              label="Ghi chú"
            >
              <Input.TextArea rows={4} placeholder="Ghi chú đặc biệt cho đơn hàng" />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item>
          <Space>
            <Button onClick={prev}>
              Quay lại
            </Button>
            <Button type="primary" htmlType="submit">
              Tiếp tục
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };
  
  const renderStepThree = () => {
    return (
      <Form
        form={stepThreeForm}
        layout="vertical"
        onFinish={handleStepThreeFinish}
        initialValues={formData}
      >
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              name="payment_method"
              label="Phương thức thanh toán"
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
          </Col>
        </Row>
        
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) => prevValues.payment_method !== curValues.payment_method}
        >
          {({ getFieldValue }) => {
            const paymentMethod = getFieldValue('payment_method');
            
            if (paymentMethod === 'credit_card') {
              return (
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
                      name="card_holder"
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
                      label="CVV"
                      rules={[
                        { required: true, message: 'Vui lòng nhập CVV!' },
                        { pattern: /^[0-9]{3,4}$/, message: 'CVV không hợp lệ!' }
                      ]}
                    >
                      <Input placeholder="123" maxLength={4} />
                    </Form.Item>
                  </Col>
                </Row>
              );
            }
            
            return null;
          }}
        </Form.Item>
        
        <Divider />
        
        <div style={{ marginBottom: 24 }}>
          <Title level={4}>Thông tin đơn hàng</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card size="small">
                <Row justify="space-between">
                  <Col>Sản phẩm:</Col>
                  <Col>{formData.product}</Col>
                </Row>
                <Row justify="space-between">
                  <Col>Số lượng:</Col>
                  <Col>{formData.quantity}</Col>
                </Row>
                <Row justify="space-between">
                  <Col>Phương thức giao hàng:</Col>
                  <Col>{formData.delivery_method === 'standard' ? 'Tiêu chuẩn' : 
                        formData.delivery_method === 'express' ? 'Nhanh' : 
                        formData.delivery_method === 'same_day' ? 'Cùng ngày' : ''}</Col>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Row justify="space-between">
                  <Col><Text strong>Tổng tiền:</Text></Col>
                  <Col><Text strong>1,500,000 VND</Text></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        
        <Form.Item>
          <Space>
            <Button onClick={prev}>
              Quay lại
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thanh toán
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };
  
  const renderStepFour = () => {
    return (
      <Result
        status="success"
        title="Thanh toán thành công!"
        subTitle={`Mã đơn hàng: ${Math.floor(100000000 + Math.random() * 900000000)}`}
        extra={[
          <Button type="primary" key="done" onClick={handleReset}>
            Đặt đơn hàng mới
          </Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text strong style={{ fontSize: 16 }}>
              Thông tin đơn hàng
            </Text>
          </Paragraph>
          <Row>
            <Col xs={24} sm={12}>
              <Text>Họ tên: {formData.fullName}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text>Email: {formData.email}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text>Sản phẩm: {formData.product}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text>Số lượng: {formData.quantity}</Text>
            </Col>
            <Col xs={24} sm={12}>
              <Text>Phương thức thanh toán: {
                formData.payment_method === 'credit_card' ? 'Thẻ tín dụng' :
                formData.payment_method === 'bank_transfer' ? 'Chuyển khoản ngân hàng' :
                formData.payment_method === 'e_wallet' ? 'Ví điện tử' :
                formData.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : ''
              }</Text>
            </Col>
          </Row>
        </div>
      </Result>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderStepOne();
      case 1:
        return renderStepTwo();
      case 2:
        return renderStepThree();
      case 3:
        return renderStepFour();
      default:
        return null;
    }
  };
  
  return (
    <div style={{ padding: '24px 0' }}>
      <Card bordered={false}>
        <Title level={2}>Biểu mẫu nhiều bước</Title>
        <Text>Hoàn thành các bước để đặt hàng</Text>
        
        <Divider />
        
        <Steps current={currentStep} style={{ marginBottom: 40 }}>
          {steps.map(step => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>
        
        {renderCurrentStep()}
      </Card>
    </div>
  );
};

export default StepForm;



