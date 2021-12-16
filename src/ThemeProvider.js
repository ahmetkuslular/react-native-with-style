import React, {useState} from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({children, theme = {}, defaultTheme = 'light'}) => {
  const [themeType, setThemeType] = useState(defaultTheme);

  const handleToggleTheme = type => {
    setThemeType(type);
  };
  const themeContextValue = {
    themeType,
    theme,
    toggleTheme: handleToggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
