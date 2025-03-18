import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeColors {
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
}

interface ThemeContextType {
  colors: ThemeColors;
  setColors: (colors: Partial<ThemeColors>) => void;
  resetToDefault: () => void;
  toggleDarkMode: () => void;
}

const defaultColors: ThemeColors = {
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
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colors, setColorsState] = useState<ThemeColors>(defaultColors);

  const setColors = (newColors: Partial<ThemeColors>) => {
    setColorsState(prevColors => ({
      ...prevColors,
      ...newColors,
    }));
  };

  const resetToDefault = () => {
    setColorsState(defaultColors);
  };

  const toggleDarkMode = () => {
    setColorsState(prevColors => {
      const isDarkMode = !prevColors.isDarkMode;
      return {
        ...prevColors,
        isDarkMode,
        background: isDarkMode ? '#141414' : '#f0f2f5',
        sidebarBackground: isDarkMode ? '#000000' : '#001529',
        headerBackground: isDarkMode ? '#1f1f1f' : '#fff',
        textPrimary: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
        textSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
        menuItemBackground: isDarkMode ? '#1f1f1f' : 'transparent',
        menuItemSelectedBackground: isDarkMode ? '#1890ff' : '#1890ff',
        menuItemText: isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.65)',
        menuItemSelectedText: '#fff',
        menuItemHoverBackground: isDarkMode ? '#1890ff33' : '#1890ff33',
        menuItemHoverText: '#fff',
      };
    });
  };

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetToDefault, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 