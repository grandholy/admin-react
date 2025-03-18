import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';

export enum UserRole {
  ADMIN = 'Admin',
  EDITOR = 'Editor',
  USER = 'User',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public status!: UserStatus;
  public lastLogin!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

// Generate some sample users when the model is created
export const seedUsers = async () => {
  try {
    const count = await User.count();
    if (count === 0) {
      await User.bulkCreate([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'adminpass', // In production, this should be hashed
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          lastLogin: new Date(),
        },
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: UserRole.EDITOR,
          status: UserStatus.ACTIVE,
          lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'password123',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          password: 'password123',
          role: UserRole.EDITOR,
          status: UserStatus.INACTIVE,
          lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
        {
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          password: 'password123',
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
          lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
      ]);
      console.log('Sample users have been created');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export default User; 