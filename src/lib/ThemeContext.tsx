import React, { ReactNode, useContext, useEffect, useState } from 'react';

interface State {
  mode: 'dark' | 'light';
}

const initialState = localStorage.theme === 'dark' ? 'dark' : 'light';

export const ThemeContext = React.createContext<State | any>(initialState);

export const ThemeProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialState);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.theme = 'light';
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value} {...props} />;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: React.FC<{ children?: ReactNode }> = ({
  children,
}) => <ThemeProvider>{children}</ThemeProvider>;
