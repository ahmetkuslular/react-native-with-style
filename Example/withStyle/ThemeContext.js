import React, {useMemo, useState, createContext, useCallback} from 'react';
import {Appearance} from 'react-native';

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

  const isSystem = themeType === 'system';
  const colorScheme = Appearance.getColorScheme();
  const themes = useMemo(() => getThemeTypes(theme), []);
  const selectedThemeType = isSystem ? colorScheme : themeType;
  const themeTypes = useMemo(
    () => Object.keys(theme.pallets).map(key => key),
    [theme],
  );

  const value = {
    themeType: selectedThemeType,
    themeTypes,
    currentTheme: themes[selectedThemeType],
    toggleTheme: handleToggleTheme,
  };

  return (
    <DefaultThemeContext.Provider value={value}>
      {children}
    </DefaultThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useWithStyle = () => React.useContext(DefaultThemeContext);
