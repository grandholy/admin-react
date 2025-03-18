import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} />
      <Layout>
        <Header onMenuClick={toggleDrawer} />
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 