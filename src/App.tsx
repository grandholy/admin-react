import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import DatabaseConfig from './pages/database/DatabaseConfig';
import Settings from './pages/settings/Settings';
import ThemeCustomization from './pages/theme/ThemeCustomization';
import DemoTable from './pages/demo/DemoTable';
import { ThemeProvider } from './contexts/ThemeContext';
import { DatabaseProvider } from './contexts/DatabaseContext';

// Form pages
import LoginForm from './pages/forms/LoginForm';
import RegisterForm from './pages/forms/RegisterForm';
import AdvancedForm from './pages/forms/AdvancedForm';
import StepForm from './pages/forms/StepForm';
import FormElements from './pages/forms/FormElements';

// Chart pages
import ChartPage from './pages/charts/Charts';

// Notification page
import NotificationDemo from './pages/notifications/Notifications';

// Utility pages
import NotFoundPage from './pages/utilities/NotFound';
import ServerErrorPage from './pages/utilities/ServerError';
import ComingSoonPage from './pages/utilities/ComingSoon';

import './App.css'; 
import IconDisplay from './pages/icons/IconDisplay';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DatabaseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="database" element={<DatabaseConfig />} />
              <Route path="settings" element={<Settings />} />
              <Route path="theme" element={<ThemeCustomization />} />
              <Route path="demo-table" element={<DemoTable />} />
              
              {/* Form routes */}
              <Route path="forms">
                <Route path="form-elements" element={<FormElements />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="advanced" element={<AdvancedForm />} />
                <Route path="step" element={<StepForm />} />
              </Route>
              
              {/* Chart routes */}
              <Route path="charts" element={<ChartPage />} />
              <Route path="icons" element={<IconDisplay />} />
              
              {/* Notification route */}
              <Route path="notifications" element={<NotificationDemo />} />
              
              {/* Utility routes */}
              <Route path="utility">
                <Route path="404" element={<NotFoundPage />} />
                <Route path="500" element={<ServerErrorPage />} />
                <Route path="coming-soon" element={<ComingSoonPage />} />
              </Route>
            </Route>
            
            {/* Global 404 handler */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </DatabaseProvider>
    </ThemeProvider>
  );
};

export default App;
