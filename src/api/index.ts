import initializeDatabase from './db/init';
import * as server from './server';

// Initialize the database and start the server
const startApp = async () => {
  try {
    await initializeDatabase();
    // The server will be started inside server.js
    console.log('API server is running');
  } catch (error) {
    console.error('Failed to start the application:', error);
    process.exit(1);
  }
};

startApp(); 