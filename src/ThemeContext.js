import * as React from 'react';

const ThemeContext = React.createContext({
  theme: null,
  defaultTheme: 'light',
  toggleTheme: () => {},
});

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
