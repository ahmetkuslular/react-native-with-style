import React, {useMemo, useState, createContext, useCallback} from 'react';

const DEFAULT_THEME = 'light';
const DefaultThemeContext = createContext({
  theme: null,
  themeType: DEFAULT_THEME,
  toggleTheme: () => {},
});

DefaultThemeContext.displayName = 'DefaultThemeContext';

const getThemeTypes = theme => {
  const {pallets = {}, ...rest} = theme;
  let themes = {};
  Object.keys(pallets).map(key => {
    themes = {
      ...themes,
      [key]: {
        color: pallets[key],
        ...rest,
      },
    };
  });
  return themes;
};

const ThemeProvider = ({children, theme, defaultTheme = DEFAULT_THEME}) => {
  const [themeType, setThemeType] = useState(defaultTheme);

  const handleToggleTheme = useCallback(type => {
    setThemeType(type);
  }, []);

  const themes = useMemo(() => getThemeTypes(theme), []);
  const value = {
    themeType,
    theme,
    currentTheme: themes[themeType],
    toggleTheme: handleToggleTheme,
  };

  return (
    <DefaultThemeContext.Provider value={value}>
      {children}
    </DefaultThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => React.useContext(DefaultThemeContext);
