import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

interface DbConfig {
    dialect: string;
    storage: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
}

// Read database configuration from file or environment variables
let dbConfig: DbConfig = {
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || path.join(__dirname, '../../../data/database.sqlite'),
};

// Attempt to read configuration from a JSON file
try {
  const configPath = path.join(__dirname, '../../../data/dbconfig.json');
  if (fs.existsSync(configPath)) {
    const configJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    dbConfig = {
      ...dbConfig,
      ...configJson,
    };
    console.log('Database configuration loaded from file');
  }
} catch (error) {
  console.warn('Failed to load database configuration from file, using defaults:', error);
}

// Configure Sequelize based on the database type
let sequelize: Sequelize;

switch (dbConfig.dialect) {
  case 'mysql':
    sequelize = new Sequelize({
      dialect: 'mysql',
      host: dbConfig.host || 'localhost',
      port: dbConfig.port || 3306,
      username: dbConfig.username || 'root',
      password: dbConfig.password || '',
      database: dbConfig.database || 'admin_template',
      logging: console.log,
    });
    break;
  case 'postgres':
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: dbConfig.host || 'localhost',
      port: dbConfig.port || 5432,
      username: dbConfig.username || 'postgres',
      password: dbConfig.password || '',
      database: dbConfig.database || 'admin_template',
      logging: console.log,
    });
    break;
  case 'mssql':
    sequelize = new Sequelize({
      dialect: 'mssql',
      host: dbConfig.host || 'localhost',
      port: dbConfig.port || 1433,
      username: dbConfig.username || 'sa',
      password: dbConfig.password || '',
      database: dbConfig.database || 'admin_template',
      logging: console.log,
    });
    break;
  case 'sqlite':
  default:
    // Ensure the directory exists
    const dbDir = path.dirname(dbConfig.storage);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbConfig.storage,
      logging: console.log,
    });
    break;
}

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize, Sequelize }; 