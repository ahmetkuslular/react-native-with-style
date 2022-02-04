import React, { useMemo, useState, createContext } from "react";

const DefaultThemeContext = createContext({
  theme: null,
  themeType: "light",
  toggleTheme: () => {},
});
const DEFAULT_THEME = "light";

DefaultThemeContext.displayName = "DefaultThemeContext";

const getThemeTypes = (theme) => {
  const { pallets = {}, ...rest } = theme;
  let themes = {};
  Object.keys(pallets).map((key) => {
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

const ThemeProvider = ({
  children,
  theme,
  defaultThemeType = DEFAULT_THEME,
}) => {
  const [themeType, setThemeType] = useState(defaultThemeType);

  const handleToggleTheme = (type) => {
    setThemeType(type);
  };

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
