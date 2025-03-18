import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Card, 
  Typography, 
  Tag, 
  Modal, 
  Form, 
  Select, 
  message, 
  Popconfirm, 
  Row, 
  Col 
} from 'antd';
import { 
  SearchOutlined, 
  UserAddOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  LockOutlined, 
  UnlockOutlined, 
  PlusOutlined, 
  CheckCircleOutlined, 
  StopOutlined 
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useTheme } from '../../contexts/ThemeContext';

const { Title } = Typography;
const { Option } = Select;

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Editor';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

const Users: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-05-10 14:30',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-05-09 09:15',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2023-04-28 11:45',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2023-05-07 16:20',
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'Editor',
      status: 'Inactive',
      lastLogin: '2023-04-15 08:30',
    },
  ]);

  const showModal = (user: User | null = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (editingUser) {
          // Update existing user
          const updatedUsers = users.map(user => 
            user.id === editingUser.id ? { ...values, id: user.id } : user
          );
          setUsers(updatedUsers);
          message.success('User updated successfully');
        } else {
          // Add new user
          const newUser: User = {
            id: Math.max(...users.map(u => u.id), 0) + 1,
            ...values,
            lastLogin: 'Never'
          };
          setUsers([...users, newUser]);
          message.success('User added successfully');
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    message.success('User deleted successfully');
  };

  const toggleUserStatus = (id: number) => {
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' as const : 'Active' as const } 
        : user
    );
    setUsers(updatedUsers);
    message.success('User status updated successfully');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => (
        <Tag color={role === 'Admin' ? 'gold' : role === 'Editor' ? 'blue' : 'green'}>
          {role}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Editor', value: 'Editor' },
        { text: 'User', value: 'User' },
      ],
      onFilter: (value: any, record: User) => record.role === value,
      responsive: ['sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Active' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value: any, record: User) => record.status === value,
      responsive: ['md', 'lg', 'xl'],
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => a.lastLogin.localeCompare(b.lastLogin),
      responsive: ['lg', 'xl'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => showModal(record)}
          />
          <Button 
            type="primary" 
            icon={record.status === 'Active' ? <StopOutlined /> : <CheckCircleOutlined />}
            size="small"
            danger={record.status === 'Active'}
            onClick={() => toggleUserStatus(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16, background: colors.background }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={12}>
            <Title level={2} style={{ margin: 0 }}>Users</Title>
          </Col>
          <Col xs={24} sm={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space direction={isMobile ? 'vertical' : 'horizontal'} style={{ width: isMobile ? '100%' : 'auto' }}>
              <Input
                placeholder="Search users..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: isMobile ? '100%' : 250 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                style={{ width: isMobile ? '100%' : 'auto' }}
              >
                Add User
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Card style={{ background: colors.background, overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '50'] }}
          size={isMobile ? "small" : "middle"}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        destroyOnClose
        okText={editingUser ? 'Save Changes' : 'Add User'}
        width={isMobile ? "100%" : 520}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'Active', role: 'User' }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select role">
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users; 