import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Switch, 
  Select, 
  Button, 
  Tabs, 
  Typography, 
  Divider, 
  Upload, 
  message,
  Row,
  Col,
  Spin
} from 'antd';
import { 
  SaveOutlined, 
  UploadOutlined
} from '@ant-design/icons';
import type { UploadFile, TabsProps } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { settingsApi, SettingsData } from '../../utils/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface SettingsFormData {
  appName: string;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;
  itemsPerPage: string;
  darkMode: boolean;
  rtlSupport: boolean;
  userProfilePicture?: string;
  defaultUserRole: string;
  userSessionTimeout: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  notifyOnNewUser: boolean;
  notifyOnSystemError: boolean;
  twoFactorAuth: boolean;
  passwordMinLength: string;
  passwordExpiry: string;
  maxLoginAttempts: string;
}

const Settings: React.FC = () => {
  const [generalForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { colors, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  
  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Fetch settings from API
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsApi.getAll();
        
        // Set form values based on retrieved settings
        generalForm.setFieldsValue({
          appName: data.appName || 'Admin React Template',
          defaultLanguage: data.defaultLanguage || 'en',
          timezone: data.timezone || 'UTC',
          dateFormat: data.dateFormat || 'MM/DD/YYYY',
          itemsPerPage: data.itemsPerPage || '10',
          darkMode: data.darkMode === 'true',
          rtlSupport: data.rtlSupport === 'true',
        });
        
        userForm.setFieldsValue({
          userProfilePicture: data.userProfilePicture,
          defaultUserRole: data.defaultUserRole || 'user',
          userSessionTimeout: data.userSessionTimeout || '30',
        });
        
        notificationsForm.setFieldsValue({
          emailNotifications: data.emailNotifications === 'true',
          pushNotifications: data.pushNotifications === 'true',
          notifyOnNewUser: data.notifyOnNewUser === 'true',
          notifyOnSystemError: data.notifyOnSystemError === 'true',
        });
        
        securityForm.setFieldsValue({
          twoFactorAuth: data.twoFactorAuth === 'true',
          passwordMinLength: data.passwordMinLength || '8',
          passwordExpiry: data.passwordExpiry || '90',
          maxLoginAttempts: data.maxLoginAttempts || '5',
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
        message.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [generalForm, userForm, notificationsForm, securityForm]);

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  const saveSettings = async (formValues: Partial<SettingsFormData>, formName: string) => {
    try {
      await settingsApi.saveSettings(formValues);
      message.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      message.error('Failed to save settings');
    }
  };

  const handleGeneralSubmit = async (values: any) => {
    setSavingGeneral(true);
    await saveSettings(values, 'general');
    setSavingGeneral(false);
  };

  const handleUserSubmit = async (values: any) => {
    setSavingUser(true);
    await saveSettings(values, 'user');
    setSavingUser(false);
  };

  const handleNotificationsSubmit = async (values: any) => {
    setSavingNotifications(true);
    await saveSettings(values, 'notifications');
    setSavingNotifications(false);
  };

  const handleSecuritySubmit = async (values: any) => {
    setSavingSecurity(true);
    await saveSettings(values, 'security');
    setSavingSecurity(false);
  };

  // Update dark mode when settings change
  const handleDarkModeChange = (checked: boolean) => {
    if ((colors.isDarkMode && !checked) || (!colors.isDarkMode && checked)) {
      toggleDarkMode();
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'General',
      children: (
        <Form
          form={generalForm}
          layout="vertical"
          onFinish={handleGeneralSubmit}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="appName"
                label="Application Name"
                rules={[{ required: true, message: 'Please enter application name' }]}
              >
                <Input placeholder="Application Name" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="defaultLanguage"
                label="Default Language"
                rules={[{ required: true, message: 'Please select language' }]}
              >
                <Select>
                  <Option value="en">English</Option>
                  <Option value="es">Spanish</Option>
                  <Option value="fr">French</Option>
                  <Option value="de">German</Option>
                  <Option value="zh">Chinese</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="timezone"
                label="Timezone"
                rules={[{ required: true, message: 'Please select timezone' }]}
              >
                <Select>
                  <Option value="UTC">UTC</Option>
                  <Option value="EST">Eastern Standard Time</Option>
                  <Option value="CST">Central Standard Time</Option>
                  <Option value="MST">Mountain Standard Time</Option>
                  <Option value="PST">Pacific Standard Time</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="dateFormat"
                label="Date Format"
                rules={[{ required: true, message: 'Please select date format' }]}
              >
                <Select>
                  <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                  <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                  <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="itemsPerPage"
                label="Items Per Page"
                rules={[{ required: true, message: 'Please enter items per page' }]}
              >
                <Select>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                  <Option value={50}>50</Option>
                  <Option value={100}>100</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="darkMode"
                label="Dark Mode"
                valuePropName="checked"
              >
                <Switch onChange={handleDarkModeChange} />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="rtlSupport"
                label="RTL Support"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={savingGeneral}
              block={isMobile}
            >
              Save General Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'User',
      children: (
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleUserSubmit}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="userProfilePicture"
                label="Profile Picture"
              >
                <Upload
                  fileList={fileList}
                  onChange={handleUploadChange}
                  maxCount={1}
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="defaultUserRole"
                label="Default User Role"
                rules={[{ required: true, message: 'Please select default role' }]}
              >
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="editor">Editor</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="userSessionTimeout"
                label="User Session Timeout (minutes)"
                rules={[{ required: true, message: 'Please enter session timeout' }]}
              >
                <Select>
                  <Option value={15}>15 minutes</Option>
                  <Option value={30}>30 minutes</Option>
                  <Option value={60}>1 hour</Option>
                  <Option value={120}>2 hours</Option>
                  <Option value={1440}>1 day</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={savingUser}
              block={isMobile}
            >
              Save User Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: 'Notifications',
      children: (
        <Form
          form={notificationsForm}
          layout="vertical"
          onFinish={handleNotificationsSubmit}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="emailNotifications"
                label="Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="pushNotifications"
                label="Push Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="notifyOnNewUser"
                label="New User Registration Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="notifyOnSystemError"
                label="System Error Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={savingNotifications}
              block={isMobile}
            >
              Save Notification Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '4',
      label: 'Security',
      children: (
        <Form
          form={securityForm}
          layout="vertical"
          onFinish={handleSecuritySubmit}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="twoFactorAuth"
                label="Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="passwordMinLength"
                label="Minimum Password Length"
              >
                <Select>
                  <Option value="6">6 characters</Option>
                  <Option value="8">8 characters</Option>
                  <Option value="10">10 characters</Option>
                  <Option value="12">12 characters</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="passwordExpiry"
                label="Password Expiry (days)"
              >
                <Select>
                  <Option value="30">30 days</Option>
                  <Option value="60">60 days</Option>
                  <Option value="90">90 days</Option>
                  <Option value="180">180 days</Option>
                  <Option value="365">365 days</Option>
                  <Option value="0">Never</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="maxLoginAttempts"
                label="Maximum Login Attempts"
              >
                <Select>
                  <Option value="3">3 attempts</Option>
                  <Option value="5">5 attempts</Option>
                  <Option value="10">10 attempts</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Divider />
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={savingSecurity}
              block={isMobile}
            >
              Save Security Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" tip="Loading settings..." />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Settings</Title>
        <Text type="secondary">Configure application settings and preferences</Text>
      </div>
      
      <Card style={{ background: colors.background }}>
        <Tabs 
          defaultActiveKey="1" 
          items={items} 
          tabPosition={isMobile ? "top" : "left"}
          size={isMobile ? "small" : "large"}
          style={{ minHeight: '500px' }}
        />
      </Card>
    </div>
  );
};

export default Settings; 