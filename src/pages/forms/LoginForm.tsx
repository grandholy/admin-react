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
  message 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  FacebookOutlined, 
  TwitterOutlined 
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text, Link: AntLink } = Typography;

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  
  const onFinish = (values: any) => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      console.log('Received values:', values);
      message.success('Đăng nhập thành công!');
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={22} sm={16} md={12} lg={10} xl={10}>
        <Card 
          bordered={false} 
          style={{ 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            background: colors.background,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>Đăng nhập</Title>
            <Text type="secondary">Vui lòng đăng nhập để tiếp tục</Text>
          </div>
          
          <Form
            form={form}
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Email" 
                size="large" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Mật khẩu"  
                size="large"
              />
            </Form.Item>
            
            <Form.Item>
              <Row justify="space-between">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <AntLink>Quên mật khẩu?</AntLink>
                </Col>
              </Row>
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                size="large"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            
            <Form.Item style={{ textAlign: 'center' }}>
              <Text type="secondary">
                Chưa có tài khoản? <AntLink strong>Đăng ký ngay</AntLink>
              </Text>
            </Form.Item>
          </Form>
          
          <Divider style={{ color: colors.textSecondary }}>
            <Text type="secondary">Hoặc đăng nhập với</Text>
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

export default LoginForm; 