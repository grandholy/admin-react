import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Divider, 
  Typography, 
  Row, 
  Col, 
  message, 
  Select 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  GoogleOutlined, 
  FacebookOutlined, 
  TwitterOutlined 
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text, Link: AntLink } = Typography;
const { Option } = Select;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  
  const onFinish = (values: any) => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      console.log('Received registration values:', values);
      message.success('Đăng ký thành công!');
      form.resetFields();
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Card 
          bordered={false} 
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            background: colors.background,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>Đăng ký tài khoản</Title>
            <Text type="secondary">Vui lòng điền đầy đủ thông tin bên dưới</Text>
          </div>
          
          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            scrollToFirstError
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="firstName"
                  label="Họ"
                  rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Họ" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="lastName"
                  label="Tên"
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9+\-\s]+$/, message: 'Số điện thoại không hợp lệ!' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>
            
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 8, message: 'Mật khẩu cần ít nhất 8 ký tự!' }
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>
            
            <Form.Item
              name="gender"
              label="Giới tính"
            >
              <Select placeholder="Chọn giới tính">
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn cần đồng ý với điều khoản dịch vụ')),
                },
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với <AntLink>Điều khoản dịch vụ</AntLink> và <AntLink>Chính sách bảo mật</AntLink>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                Đăng ký
              </Button>
            </Form.Item>
            
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
              <Text type="secondary">
                Đã có tài khoản? <AntLink strong>Đăng nhập</AntLink>
              </Text>
            </Form.Item>
          </Form>
          
          <Divider style={{ color: colors.textSecondary }}>
            <Text type="secondary">Hoặc đăng ký với</Text>
          </Divider>
          
          <Row gutter={8} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Button 
                block 
                icon={<GoogleOutlined />} 
                style={{ backgroundColor: '#DB4437', color: 'white', border: 'none' }}
              >
                Google
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                block 
                icon={<FacebookOutlined />} 
                style={{ backgroundColor: '#4267B2', color: 'white', border: 'none' }}
              >
                Facebook
              </Button>
            </Col>
            <Col span={8}>
              <Button 
                block 
                icon={<TwitterOutlined />} 
                style={{ backgroundColor: '#1DA1F2', color: 'white', border: 'none' }}
              >
                Twitter
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm; 