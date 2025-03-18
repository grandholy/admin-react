import React, { createContext, useState, useContext, ReactNode } from 'react';

export type DatabaseType = 'mysql' | 'sqlserver' | 'sqlite' | 'postgres' | 'mongodb';

interface DatabaseConfig {
  type: DatabaseType;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  filename?: string; // For SQLite
  connectionString?: string;
}

interface DatabaseContextType {
  currentDatabase: DatabaseType;
  config: DatabaseConfig;
  setDatabase: (type: DatabaseType) => void;
  updateConfig: (config: Partial<DatabaseConfig>) => void;
  testConnection: () => Promise<boolean>;
}

const defaultConfig: DatabaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'admin_template'
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDatabase, setCurrentDatabase] = useState<DatabaseType>('mysql');
  const [config, setConfig] = useState<DatabaseConfig>(defaultConfig);

  const setDatabase = (type: DatabaseType) => {
    setCurrentDatabase(type);
    // Set default configuration based on database type
    switch(type) {
      case 'mysql':
        setConfig({
          type,
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'admin_template'
        });
        break;
      case 'sqlserver':
        setConfig({
          type,
          host: 'localhost',
          port: 1433,
          username: 'sa',
          password: '',
          database: 'admin_template'
        });
        break;
      case 'sqlite':
        setConfig({
          type,
          filename: 'database.sqlite'
        });
        break;
      case 'postgres':
        setConfig({
          type,
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '',
          database: 'admin_template'
        });
        break;
      case 'mongodb':
        setConfig({
          type,
          connectionString: 'mongodb://localhost:27017/admin_template'
        });
        break;
      default:
        setConfig(defaultConfig);
    }
  };

  const updateConfig = (newConfig: Partial<DatabaseConfig>) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  const testConnection = async (): Promise<boolean> => {
    // In a real application, this would attempt to connect to the database
    // and return true/false based on success
    console.log('Testing connection to', currentDatabase, 'with config:', config);
    
    // Simulate connection test
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  return (
    <DatabaseContext.Provider value={{ 
      currentDatabase, 
      config, 
      setDatabase, 
      updateConfig, 
      testConnection 
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}; 