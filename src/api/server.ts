import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from './db/database';
import themeRoutes from './routes/themeRoutes';
import settingsRoutes from './routes/settingsRoutes';
import userRoutes from './routes/userRoutes';
import tableDataRoutes from './routes/tableDataRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../build')));

// Routes
app.use('/api/themes', themeRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/table-data', tableDataRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const startServer = async () => {
  try {
    // Sync database models
    await sequelize.sync();
    console.log('Database synced successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

export { app }; 