import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Progress, Table, Alert, Typography, Divider, Button, Tabs } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  FileOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { useTheme } from '../../contexts/ThemeContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    stats: {
      users: 0,
      orders: 0,
      revenue: 0,
      products: 0
    },
    recentActivity: [],
    salesData: [],
    categoryData: []
  });
  
  const { colors } = useTheme();

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      setData({
        stats: {
          users: 1248,
          orders: 864,
          revenue: 48650,
          products: 345
        },
        recentActivity: [
          { id: 1, user: 'John Doe', action: 'Đăng nhập', time: '2 phút trước' },
          { id: 2, user: 'Jane Smith', action: 'Tạo sản phẩm mới', time: '15 phút trước' },
          { id: 3, user: 'Robert Johnson', action: 'Cập nhật hồ sơ', time: '1 giờ trước' },
          { id: 4, user: 'Emily Davis', action: 'Đặt hàng #1234', time: '2 giờ trước' },
          { id: 5, user: 'Michael Wilson', action: 'Thanh toán hóa đơn', time: '3 giờ trước' },
        ],
        salesData: [
          { month: 'Tháng 1', value: 3500 },
          { month: 'Tháng 2', value: 4200 },
          { month: 'Tháng 3', value: 3800 },
          { month: 'Tháng 4', value: 5000 },
          { month: 'Tháng 5', value: 4800 },
          { month: 'Tháng 6', value: 6000 },
          { month: 'Tháng 7', value: 5500 },
          { month: 'Tháng 8', value: 7000 },
          { month: 'Tháng 9', value: 6800 },
          { month: 'Tháng 10', value: 8000 },
          { month: 'Tháng 11', value: 8500 },
          { month: 'Tháng 12', value: 9500 },
        ],
        categoryData: [
          { type: 'Điện tử', value: 35 },
          { type: 'Thời trang', value: 25 },
          { type: 'Thực phẩm', value: 18 },
          { type: 'Đồ gia dụng', value: 15 },
          { type: 'Khác', value: 7 },
        ],
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Simulate refreshing data with a timeout
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Line chart configuration
  const lineConfig = {
    data: data.salesData,
    height: 300,
    xField: 'month',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    smooth: true,
  };

  // Pie chart configuration
  const pieConfig = {
    data: data.categoryData,
    height: 300,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      text: (d:any) => `${d.value}%`,
      position: 'outside',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  // Table columns for recent activity
  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Bảng điều khiển</Title>
        <Button 
          icon={<ReloadOutlined />} 
          onClick={refreshData} 
          loading={loading}
        >
          Làm mới
        </Button>
      </div>
      
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Người dùng"
              value={data.stats.users}
              prefix={<UserOutlined />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 12%
                </Text>
              }
            />
            <Progress percent={75} status="active" strokeColor="#1890ff" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Đơn hàng"
              value={data.stats.orders}
              prefix={<ShoppingCartOutlined />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 8%
                </Text>
              }
            />
            <Progress percent={68} status="active" strokeColor="#52c41a" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Doanh thu"
              value={data.stats.revenue}
              prefix={<DollarOutlined />}
              suffix={
                <Text type="success" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined /> 15%
                </Text>
              }
              precision={2}
            />
            <Progress percent={82} status="active" strokeColor="#faad14" size="small" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Sản phẩm"
              value={data.stats.products}
              prefix={<FileOutlined />}
              suffix={
                <Text type="danger" style={{ fontSize: 14 }}>
                  <ArrowDownOutlined /> 3%
                </Text>
              }
            />
            <Progress percent={45} status="exception" strokeColor="#ff4d4f" size="small" />
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      <Alert
        message="Chào mừng đến với Bảng điều khiển"
        description="Đây là bảng điều khiển quản trị, hiển thị số liệu thống kê và dữ liệu quan trọng."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* Charts and Tables */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Doanh thu theo tháng" 
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            {!loading && <Line {...lineConfig} />}
          </Card>
          
          <Card title="Hoạt động gần đây" loading={loading}>
            <Table 
              dataSource={data.recentActivity} 
              columns={columns} 
              pagination={false} 
              rowKey="id"
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title="Danh mục sản phẩm" 
            loading={loading}
            style={{ marginBottom: 16 }}
          >
            {!loading && <Pie {...pieConfig} />}
          </Card>
          
          <Card title="Thông báo" loading={loading}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Hệ thống" key="1">
                <Alert 
                  message="Cập nhật hệ thống" 
                  description="Hệ thống sẽ được bảo trì vào ngày 15/04/2023."
                  type="warning" 
                  showIcon 
                  style={{ marginBottom: 8 }}
                />
                <Alert 
                  message="Phiên bản mới" 
                  description="Phiên bản mới 2.0.5 đã sẵn sàng để cập nhật."
                  type="info" 
                  showIcon 
                  style={{ marginBottom: 8 }}
                />
              </TabPane>
              <TabPane tab="Thông báo" key="2">
                <Alert 
                  message="Doanh thu tăng" 
                  description="Doanh thu tháng này tăng 15% so với tháng trước."
                  type="success" 
                  showIcon 
                  style={{ marginBottom: 8 }}
                />
                <Alert 
                  message="Người dùng mới" 
                  description="Có 25 người dùng mới đăng ký trong hôm nay."
                  type="info" 
                  showIcon 
                  style={{ marginBottom: 8 }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 