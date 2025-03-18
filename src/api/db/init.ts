import { sequelize } from './database';
import { seedUsers } from '../models/User';
import { seedTableData } from '../models/TableData';
import { seedSettings } from '../models/Settings';
import { seedThemes } from '../models/Theme';

const initializeDatabase = async () => {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');

    // Seed data
    await Promise.all([
      seedUsers(),
      seedTableData(),
      seedSettings(),
      seedThemes(),
    ]);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

export default initializeDatabase; 