"use client"
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = 'dark' | 'light';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within AppThemeProvider");
  }
  return context;
};

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={cn('w-full h-full text-foreground', {
        'bg-gray-100': theme === 'light',
        'bg-gray-950': theme === 'dark',
      })}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;
