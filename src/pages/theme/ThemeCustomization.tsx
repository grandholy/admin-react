import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Divider, Space, Switch } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text } = Typography;

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Text style={{ display: 'block', marginBottom: 8 }}>{label}</Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 40, height: 40, padding: 0, border: 'none' }}
        />
        <Text code>{color}</Text>
      </div>
    </div>
  );
};

const ThemeCustomization: React.FC = () => {
  const { colors, setColors, resetToDefault, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    setColors({ [colorKey]: value });
  };

  const colorOptions = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'secondary', label: 'Secondary Color' },
    { key: 'background', label: 'Page Background' },
    { key: 'sidebarBackground', label: 'Sidebar Background' },
    { key: 'headerBackground', label: 'Header Background' },
    { key: 'textPrimary', label: 'Primary Text Color' },
    { key: 'textSecondary', label: 'Secondary Text Color' },
    { key: 'menuItemBackground', label: 'Menu Item Background' },
    { key: 'menuItemSelectedBackground', label: 'Selected Menu Item Background' },
    { key: 'menuItemText', label: 'Menu Item Text Color' },
    { key: 'menuItemSelectedText', label: 'Selected Menu Item Text Color' },
    { key: 'menuItemHoverBackground', label: 'Menu Item Hover Background' },
    { key: 'menuItemHoverText', label: 'Menu Item Hover Text Color' },
  ] as const;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '0',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center', 
        marginBottom: 24 
      }}>
        <Title level={2} style={{ margin: 0 }}>Theme Customization</Title>
        <Space>
          <Switch
            checked={colors.isDarkMode}
            onChange={toggleDarkMode}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
          <Button 
            type="primary" 
            icon={<RedoOutlined />} 
            onClick={resetToDefault}
          >
            Reset to Default
          </Button>
        </Space>
      </div>

      <Card style={{ background: colors.background }}>
        <Title level={4}>Color Settings</Title>
        <Text type="secondary">Customize the colors of your admin panel</Text>
        
        <Divider />
        
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            {colorOptions.slice(0, Math.ceil(colorOptions.length / 2)).map((option) => (
              <ColorPicker
                key={option.key}
                label={option.label}
                color={colors[option.key]}
                onChange={(value) => handleColorChange(option.key, value)}
              />
            ))}
          </Col>
          
          <Col xs={24} md={12}>
            {colorOptions.slice(Math.ceil(colorOptions.length / 2)).map((option) => (
              <ColorPicker
                key={option.key}
                label={option.label}
                color={colors[option.key]}
                onChange={(value) => handleColorChange(option.key, value)}
              />
            ))}
          </Col>
        </Row>

        <Divider />
        
        <Title level={4}>Preview</Title>
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.background,
                marginBottom: 16
              }}>
                <Text style={{ color: colors.textPrimary }}>Background Color</Text>
              </div>

              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.sidebarBackground, 
                marginBottom: 16
              }}>
                <Text style={{ color: colors.menuItemText }}>Sidebar Background</Text>
              </div>

              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.headerBackground,
                marginBottom: 16
              }}>
                <Text style={{ color: colors.textPrimary }}>Header Background</Text>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.menuItemBackground,
                marginBottom: 16
              }}>
                <Text style={{ color: colors.menuItemText }}>Menu Item Background</Text>
              </div>

              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.menuItemSelectedBackground,
                marginBottom: 16
              }}>
                <Text style={{ color: colors.menuItemSelectedText }}>Selected Menu Item</Text>
              </div>

              <div style={{ 
                padding: 20, 
                borderRadius: 8, 
                backgroundColor: colors.menuItemHoverBackground,
                marginBottom: 16
              }}>
                <Text style={{ color: colors.menuItemHoverText }}>Menu Item Hover</Text>
              </div>
            </Col>
          </Row>

          <Space wrap>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="link">Link Button</Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ThemeCustomization;