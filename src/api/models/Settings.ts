import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../db/database';

// Settings attributes
export interface SettingsAttributes {
  id: number;
  key: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Attributes for Settings creation
export interface SettingsCreationAttributes extends Optional<SettingsAttributes, 'id'> {}

// Settings model
class Settings extends Model<SettingsAttributes, SettingsCreationAttributes> implements SettingsAttributes {
  public id!: number;
  public key!: string;
  public value!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Settings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'settings',
    timestamps: true,
  }
);

// Default settings
const defaultSettings = {
  appName: 'Admin Template',
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  itemsPerPage: '10',
  darkMode: 'false',
  rtlSupport: 'false',
  defaultRole: 'user',
  sessionTimeout: '30',
  emailNotifications: 'true',
  pushNotifications: 'false',
  newUserNotifications: 'true',
  systemErrorNotifications: 'true',
  twoFactorAuth: 'false',
  passwordPolicy: 'medium',
  passwordExpiry: '90',
  maxLoginAttempts: '5',
};

// Generate default settings
export const seedSettings = async () => {
  try {
    for (const [key, value] of Object.entries(defaultSettings)) {
      const existing = await Settings.findOne({ where: { key } });
      if (!existing) {
        await Settings.create({
          key,
          value: value.toString(),
        });
        console.log(`Default setting ${key} created`);
      }
    }
  } catch (error) {
    console.error('Error seeding settings:', error);
  }
};

export default Settings; 