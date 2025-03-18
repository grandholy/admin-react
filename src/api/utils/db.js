const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(dataDir, 'data.sqlite'),
  logging: false,
  retry: {
    max: 10,
    match: [/SQLITE_BUSY/],
    backoffBase: 100,
    backoffExponent: 1.1,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  transactionType: 'IMMEDIATE'
});

// Define Settings model
const Settings = sequelize.define('Settings', {
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  Settings,
  testConnection
}; 