import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  DatabaseOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  TableOutlined,
  FormOutlined,
  AreaChartOutlined,
  BellOutlined,
  ToolOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const { Sider } = Layout;

interface SidebarProps {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerVisible, setDrawerVisible }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { colors } = useTheme();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Get the selected menu item key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return '1';
    if (path.startsWith('/users')) return '2';
    if (path.startsWith('/database')) return '3';
    if (path.startsWith('/settings')) return '4';
    if (path.startsWith('/theme')) return '5';
    if (path.startsWith('/demo-table')) return '6';
    if (path.startsWith('/forms')) return '7';
    if (path.startsWith('/charts')) return '8';
    if (path.startsWith('/notifications')) return '9';
    if (path.startsWith('/utility')) return '10';
    return '1'; // Default to dashboard
  };

  const menuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: '3',
      icon: <DatabaseOutlined />,
      label: <Link to="/database">Database</Link>,
    },
    {
      key: '4',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: '5',
      icon: <ThunderboltOutlined />,
      label: <Link to="/theme">Theme Customization</Link>,
    },
    {
      key: '6',
      icon: <TableOutlined />,
      label: <Link to="/demo-table">Demo Table</Link>,
    },
    {
      key: '6',
      icon: <LikeOutlined />,
      label: <Link to="/icons">Icons</Link>,
    },
    {
      key: '7',
      icon: <FormOutlined />,
      label: 'Forms',
      children: [
        {
          key: '7-0',
          label: <Link to="/forms/form-elements">Form Elements</Link>,
        },
        {
          key: '7-1',
          label: <Link to="/forms/login">Login</Link>,
        },
        {
          key: '7-2',
          label: <Link to="/forms/register">Register</Link>,
        },
        {
          key: '7-3',
          label: <Link to="/forms/advanced">Advanced Form</Link>,
        },
        {
          key: '7-4',
          label: <Link to="/forms/step">Step Form</Link>,
        },
      ],
    },
    {
      key: '8',
      icon: <AreaChartOutlined />,
      label: <Link to="/charts">Charts</Link>,
    },
    {
      key: '9',
      icon: <BellOutlined />,
      label: <Link to="/notifications">Notifications</Link>,
    },
    {
      key: '10',
      icon: <ToolOutlined />,
      label: 'Utility Pages',
      children: [
        {
          key: '10-1',
          label: <Link to="/utility/404">404 Page</Link>,
        },
        {
          key: '10-2',
          label: <Link to="/utility/500">500 Page</Link>,
        },
        {
          key: '10-3',
          label: <Link to="/utility/coming-soon">Coming Soon</Link>,
        },
      ],
    },
  ];

  const sideMenuContent = (
    <>
      <div className="logo" style={{ 
        height: 32, 
        margin: 16, 
        color: 'white', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: 18, 
        fontWeight: 'bold' 
      }}>
        {!collapsed ? 'Admin Template' : 'AT'}
      </div>
      <div style={{ textAlign: 'center', margin: '8px 0' }}>
        <Button 
          type="text" 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={toggleCollapsed} 
          style={{ color: 'white' }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[getSelectedKey()]}
        defaultOpenKeys={[getSelectedKey()]}
        style={{ borderRight: 0 }}
        items={menuItems}
        onClick={() => isMobile && setDrawerVisible(false)}
      />
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
        closable={false}
        style={{ 
          backgroundColor: colors.sidebarBackground 
        }}
        bodyStyle={{ padding: 0 }}
      >
        {sideMenuContent}
      </Drawer>
    );
  }

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed} 
      width={250}
      style={{ 
        backgroundColor: colors.sidebarBackground,
        minHeight: '100vh',
      }}
    >
      {sideMenuContent}
    </Sider>
  );
};

export default Sidebar; 