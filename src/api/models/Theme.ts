import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';

export interface ThemeAttributes {
  id: number;
  name: string;
  isDefault: boolean;
  primary: string;
  secondary: string;
  background: string;
  sidebarBackground: string;
  headerBackground: string;
  textPrimary: string;
  textSecondary: string;
  menuItemBackground: string;
  menuItemSelectedBackground: string;
  menuItemText: string;
  menuItemSelectedText: string;
  menuItemHoverBackground: string;
  menuItemHoverText: string;
  isDarkMode: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ThemeCreationAttributes extends Omit<ThemeAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> implements ThemeAttributes {
  public id!: number;
  public name!: string;
  public isDefault!: boolean;
  public primary!: string;
  public secondary!: string;
  public background!: string;
  public sidebarBackground!: string;
  public headerBackground!: string;
  public textPrimary!: string;
  public textSecondary!: string;
  public menuItemBackground!: string;
  public menuItemSelectedBackground!: string;
  public menuItemText!: string;
  public menuItemSelectedText!: string;
  public menuItemHoverBackground!: string;
  public menuItemHoverText!: string;
  public isDarkMode!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Theme.init(
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
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    primary: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#1890ff',
    },
    secondary: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#52c41a',
    },
    background: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#f0f2f5',
    },
    sidebarBackground: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#001529',
    },
    headerBackground: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#fff',
    },
    textPrimary: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'rgba(0, 0, 0, 0.85)',
    },
    textSecondary: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'rgba(0, 0, 0, 0.45)',
    },
    menuItemBackground: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'transparent',
    },
    menuItemSelectedBackground: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#1890ff',
    },
    menuItemText: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'rgba(255, 255, 255, 0.65)',
    },
    menuItemSelectedText: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#fff',
    },
    menuItemHoverBackground: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '#1890ff33',
    },
    menuItemHoverText: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '#fff',
    },
    isDarkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'themes',
    timestamps: true,
    hooks: {
      afterCreate: async (theme: Theme) => {
        // If this theme is set as default, update all other themes to not be default
        if (theme.isDefault) {
          await Theme.update(
            { isDefault: false },
            { where: { id: { [sequelize.getDialect() === 'postgres' ? 'ne' : '!=']: theme.id } } }
          );
        }
      },
      afterUpdate: async (theme: Theme) => {
        // If this theme is set as default, update all other themes to not be default
        if (theme.isDefault) {
          await Theme.update(
            { isDefault: false },
            { where: { id: { [sequelize.getDialect() === 'postgres' ? 'ne' : '!=']: theme.id } } }
          );
        }
      },
    },
  }
);

// Generate default themes
export const seedThemes = async () => {
  try {
    const count = await Theme.count();
    if (count === 0) {
      await Theme.bulkCreate([
        {
          name: 'Default Light',
          isDefault: true,
          primary: '#1890ff',
          secondary: '#52c41a',
          background: '#f0f2f5',
          sidebarBackground: '#001529',
          headerBackground: '#fff',
          textPrimary: 'rgba(0, 0, 0, 0.85)',
          textSecondary: 'rgba(0, 0, 0, 0.45)',
          menuItemBackground: 'transparent',
          menuItemSelectedBackground: '#1890ff',
          menuItemText: 'rgba(255, 255, 255, 0.65)',
          menuItemSelectedText: '#fff',
          menuItemHoverBackground: '#1890ff33',
          menuItemHoverText: '#fff',
          isDarkMode: false,
        },
        {
          name: 'Default Dark',
          isDefault: false,
          primary: '#1890ff',
          secondary: '#52c41a',
          background: '#141414',
          sidebarBackground: '#000000',
          headerBackground: '#1f1f1f',
          textPrimary: 'rgba(255, 255, 255, 0.85)',
          textSecondary: 'rgba(255, 255, 255, 0.45)',
          menuItemBackground: '#1f1f1f',
          menuItemSelectedBackground: '#1890ff',
          menuItemText: 'rgba(255, 255, 255, 0.65)',
          menuItemSelectedText: '#fff',
          menuItemHoverBackground: '#1890ff33',
          menuItemHoverText: '#fff',
          isDarkMode: true,
        },
        {
          name: 'Blue & Green',
          isDefault: false,
          primary: '#0052cc',
          secondary: '#36b37e',
          background: '#f5f7fa',
          sidebarBackground: '#172b4d',
          headerBackground: '#ffffff',
          textPrimary: '#172b4d',
          textSecondary: '#6b778c',
          menuItemBackground: 'transparent',
          menuItemSelectedBackground: '#0052cc',
          menuItemText: 'rgba(255, 255, 255, 0.7)',
          menuItemSelectedText: '#ffffff',
          menuItemHoverBackground: 'rgba(0, 82, 204, 0.3)',
          menuItemHoverText: '#ffffff',
          isDarkMode: false,
        },
      ]);
      console.log('Default themes have been created');
    }
  } catch (error) {
    console.error('Error seeding themes:', error);
  }
};

export default Theme; 