import React from 'react';
import { Layout, Button, Space } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { colors, toggleDarkMode } = useTheme();

  return (
    <AntHeader style={{
      backgroundColor: colors.headerBackground,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
    }}>
      <Space>
        <Button
          type="text"
          icon={<MenuUnfoldOutlined />}
          onClick={onMenuClick}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
      </Space>
      <Space>
        <Button 
          type="text" 
          icon={colors.isDarkMode ? <BulbFilled /> : <BulbOutlined />}
          onClick={toggleDarkMode}
          style={{ fontSize: '16px' }}
        />
        <Button type="text" icon={<UserOutlined />} style={{ marginRight: 8 }} />
        <span className="user-info" style={{
          display: window.innerWidth <= 576 ? 'none' : 'inline',
        }}>
          Admin User
        </span>
      </Space>
    </AntHeader>
  );
};

export default Header; 