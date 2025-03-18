import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';

export interface TableDataAttributes {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TableDataCreationAttributes extends Omit<TableDataAttributes, 'id'> {}

class TableData extends Model<TableDataAttributes, TableDataCreationAttributes> implements TableDataAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public category!: string;
  public status!: string;
  public price!: number;
  public stock!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TableData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'table_data',
    timestamps: true,
  }
);

// Sample data for the demo table
const sampleData = [
  {
    name: 'Product A',
    description: 'High-quality product with excellent features',
    category: 'Electronics',
    status: 'In Stock',
    price: 99.99,
    stock: 100,
  },
  {
    name: 'Product B',
    description: 'Premium product with advanced capabilities',
    category: 'Electronics',
    status: 'Low Stock',
    price: 199.99,
    stock: 15,
  },
  {
    name: 'Product C',
    description: 'Basic product for everyday use',
    category: 'Accessories',
    status: 'Out of Stock',
    price: 49.99,
    stock: 0,
  },
  {
    name: 'Product D',
    description: 'Luxury product with premium features',
    category: 'Electronics',
    status: 'In Stock',
    price: 299.99,
    stock: 50,
  },
  {
    name: 'Product E',
    description: 'Essential product for daily needs',
    category: 'Accessories',
    status: 'In Stock',
    price: 79.99,
    stock: 200,
  },
  {
    name: 'Product F',
    description: 'Professional grade product',
    category: 'Electronics',
    status: 'Low Stock',
    price: 399.99,
    stock: 10,
  },
  {
    name: 'Product G',
    description: 'Budget-friendly product',
    category: 'Accessories',
    status: 'In Stock',
    price: 29.99,
    stock: 150,
  },
  {
    name: 'Product H',
    description: 'High-end product with premium quality',
    category: 'Electronics',
    status: 'Out of Stock',
    price: 599.99,
    stock: 0,
  },
];

// Seed table data
export const seedTableData = async () => {
  try {
    const count = await TableData.count();
    if (count === 0) {
      await TableData.bulkCreate(sampleData);
      console.log('Sample table data has been created');
    }
  } catch (error) {
    console.error('Error seeding table data:', error);
  }
};

export default TableData; 