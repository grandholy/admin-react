import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Card, Typography, Tag, Modal, Form, Select, InputNumber, message, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  price: number;
  stock: number;
}

const DemoTable: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    // In a real application, you would fetch data from your API
    // For this demo, we'll simulate an API call with a timeout
    setTimeout(() => {
      // This data would normally come from your API
      const demoData: Product[] = [
        { id: 1, name: 'Product A', description: 'High-quality product with excellent features', category: 'Electronics', status: 'In Stock', price: 99.99, stock: 100 },
        { id: 2, name: 'Product B', description: 'Premium product with advanced capabilities', category: 'Electronics', status: 'Low Stock', price: 199.99, stock: 15 },
        { id: 3, name: 'Product C', description: 'Basic product for everyday use', category: 'Accessories', status: 'Out of Stock', price: 49.99, stock: 0 },
        { id: 4, name: 'Product D', description: 'Luxury product with premium features', category: 'Electronics', status: 'In Stock', price: 299.99, stock: 50 },
        { id: 5, name: 'Product E', description: 'Essential product for daily needs', category: 'Accessories', status: 'In Stock', price: 79.99, stock: 200 },
        { id: 6, name: 'Product F', description: 'Professional grade product', category: 'Electronics', status: 'Low Stock', price: 399.99, stock: 10 },
        { id: 7, name: 'Product G', description: 'Budget-friendly product', category: 'Accessories', status: 'In Stock', price: 29.99, stock: 150 },
        { id: 8, name: 'Product H', description: 'High-end product with premium quality', category: 'Electronics', status: 'Out of Stock', price: 599.99, stock: 0 },
      ];
      setData(demoData);
      setLoading(false);
    }, 1000);
  }, []);

  const showModal = (record?: Product) => {
    setEditingRecord(record || null);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        if (editingRecord) {
          // Update existing product
          const updatedData = data.map(item => {
            if (item.id === editingRecord.id) {
              return { ...values, id: editingRecord.id };
            }
            return item;
          });
          setData(updatedData);
          message.success('Product updated successfully');
        } else {
          // Add new product
          const newId = Math.max(...data.map(item => item.id), 0) + 1;
          const newProduct = {
            ...values,
            id: newId,
          };
          setData([...data, newProduct]);
          message.success('Product added successfully');
        }
        setModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    message.success('Product deleted successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'green';
      case 'Low Stock':
        return 'orange';
      case 'Out of Stock':
        return 'red';
      default:
        return 'default';
    }
  };

  const filteredData = data.filter(item => {
    const searchLower = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
    );
  });

  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Electronics', value: 'Electronics' },
        { text: 'Accessories', value: 'Accessories' },
      ],
      onFilter: (value: any, record: Product) => record.category === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Low Stock', value: 'Low Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
      ],
      onFilter: (value: any, record: Product) => record.status === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={4}>Products</Title>
          <Space>
            <Input
              placeholder="Search products"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal()}
            >
              Add Product
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total) => `Total ${total} items`,
          }}
        />

        <Modal
          title={editingRecord ? 'Edit Product' : 'Add Product'}
          open={modalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ status: 'In Stock', category: 'Electronics' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter product description' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select>
                <Option value="Electronics">Electronics</Option>
                <Option value="Accessories">Accessories</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select>
                <Option value="In Stock">In Stock</Option>
                <Option value="Low Stock">Low Stock</Option>
                <Option value="Out of Stock">Out of Stock</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: 'Please enter product price' },
                { type: 'number', min: 0, message: 'Price must be a positive number' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => parseFloat(value!.replace(/\$\s?|(,*)/g, ''))}
                step={0.01}
                precision={2}
              />
            </Form.Item>
            <Form.Item
              name="stock"
              label="Stock"
              rules={[
                { required: true, message: 'Please enter stock quantity' },
                { type: 'number', min: 0, message: 'Stock must be a positive number' }
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default DemoTable; 