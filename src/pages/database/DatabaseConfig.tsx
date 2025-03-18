import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Typography,
  Divider,
  message,
  Spin,
  Alert,
  Space,
  Row,
  Col
} from 'antd';
import { SaveOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useDatabase } from '../../contexts/DatabaseContext';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text } = Typography;
const { Option } = Select;

const DatabaseConfig: React.FC = () => {
  const { config, updateConfig, testConnection } = useDatabase();
  const [form] = Form.useForm();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { colors } = useTheme();

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set form values when config changes
  useEffect(() => {
    form.setFieldsValue(config);
  }, [config, form]);

  const handleSubmit = (values: any) => {
    updateConfig(values);
    message.success('Database configuration saved successfully');
  };

  const handleTestConnection = async () => {
    try {
      await form.validateFields();
      setIsTesting(true);
      setTestResult(null);
      
      // Call the async testConnection function
      const connectionSuccess = await testConnection();
      
      // Format the result as expected by the state
      setTestResult({
        success: connectionSuccess,
        message: connectionSuccess 
          ? 'Database connection successful!'
          : 'Failed to connect to the database. Please check your settings.'
      });
    } catch (error) {
      console.error('Validation failed:', error);
      setTestResult({
        success: false,
        message: 'Connection test failed: ' + (error instanceof Error ? error.message : 'Unknown error')
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Render database-specific fields based on the selected database type
  const renderDatabaseSpecificFields = () => {
    const dbType = form.getFieldValue('type');
    
    switch (dbType) {
      case 'mysql':
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="host"
                  label="Host"
                  rules={[{ required: true, message: 'Please enter host' }]}
                >
                  <Input placeholder="localhost" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="port"
                  label="Port"
                  rules={[{ required: true, message: 'Please enter port' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} placeholder="3306" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="database"
                  label="Database Name"
                  rules={[{ required: true, message: 'Please enter database name' }]}
                >
                  <Input placeholder="my_database" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please enter username' }]}
                >
                  <Input placeholder="root" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        
      case 'postgresql':
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="host"
                  label="Host"
                  rules={[{ required: true, message: 'Please enter host' }]}
                >
                  <Input placeholder="localhost" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="port"
                  label="Port"
                  rules={[{ required: true, message: 'Please enter port' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} placeholder="5432" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="database"
                  label="Database Name"
                  rules={[{ required: true, message: 'Please enter database name' }]}
                >
                  <Input placeholder="postgres" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please enter username' }]}
                >
                  <Input placeholder="postgres" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="schema"
                  label="Schema"
                >
                  <Input placeholder="public" />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        
      case 'sqlserver':
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="host"
                  label="Server"
                  rules={[{ required: true, message: 'Please enter server' }]}
                >
                  <Input placeholder="localhost" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="port"
                  label="Port"
                  rules={[{ required: true, message: 'Please enter port' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} placeholder="1433" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="database"
                  label="Database Name"
                  rules={[{ required: true, message: 'Please enter database name' }]}
                >
                  <Input placeholder="master" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true, message: 'Please enter username' }]}
                >
                  <Input placeholder="sa" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="trustServerCertificate"
                  label="Trust Server Certificate"
                  valuePropName="checked"
                >
                  <Select>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        
      case 'sqlite':
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24}>
                <Form.Item
                  name="filename"
                  label="Database File Path"
                  rules={[{ required: true, message: 'Please enter file path' }]}
                >
                  <Input placeholder="./data/database.sqlite" />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        
      case 'mongodb':
        return (
          <>
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="host"
                  label="Host"
                  rules={[{ required: true, message: 'Please enter host' }]}
                >
                  <Input placeholder="localhost" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="port"
                  label="Port"
                  rules={[{ required: true, message: 'Please enter port' }]}
                >
                  <InputNumber min={1} max={65535} style={{ width: '100%' }} placeholder="27017" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="database"
                  label="Database Name"
                  rules={[{ required: true, message: 'Please enter database name' }]}
                >
                  <Input placeholder="admin" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="username"
                  label="Username"
                >
                  <Input placeholder="admin" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="password"
                  label="Password"
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
              
              <Col xs={24} md={12}>
                <Form.Item
                  name="authSource"
                  label="Auth Source"
                >
                  <Input placeholder="admin" />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 16 }}>Database Configuration</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Configure your database connection settings
      </Text>
      
      <Card style={{ background: colors.background }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={config}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="type"
                label="Database Type"
                rules={[{ required: true, message: 'Please select database type' }]}
              >
                <Select placeholder="Select database type">
                  <Option value="mysql">MySQL</Option>
                  <Option value="postgresql">PostgreSQL</Option>
                  <Option value="sqlserver">SQL Server</Option>
                  <Option value="sqlite">SQLite</Option>
                  <Option value="mongodb">MongoDB</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          {renderDatabaseSpecificFields()}
          
          <Divider />
          
          <div style={{ display: 'flex', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              htmlType="submit"
              style={{ width: isMobile ? '100%' : 'auto' }}
            >
              Save Configuration
            </Button>
            
            <Button 
              type="default" 
              icon={<DatabaseOutlined />} 
              onClick={handleTestConnection}
              loading={isTesting}
              style={{ width: isMobile ? '100%' : 'auto' }}
            >
              Test Connection
            </Button>
          </div>
        </Form>
        
        {testResult && (
          <div style={{ marginTop: 24 }}>
            <Alert
              message={testResult.success ? "Connection Successful" : "Connection Failed"}
              description={testResult.message}
              type={testResult.success ? "success" : "error"}
              showIcon
            />
          </div>
        )}
        
        <Divider />
        
        <div>
          <Title level={4}>Current Configuration</Title>
          <pre style={{ 
            backgroundColor: colors.isDarkMode ? '#333' : '#f5f5f5', 
            padding: 16, 
            borderRadius: 4,
            overflowX: 'auto'
          }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  );
};

export default DatabaseConfig; 