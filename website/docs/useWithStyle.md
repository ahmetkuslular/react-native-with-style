---
id: use-with-style
title: useWithStyle
slug: /use-with-style
hide_table_of_contents: true
hide_title: true
---

# useWithStyle

`useWithStyle` is a hook function.

# hook Props

> Takes 4 props wrapped with useWithStyle.

### `currentTheme` | object

return the current theme if you want to do the styling directly in the component and not via styles

### `themeTypes` | array

Returns the key of the all themes.

### `themeType` | string

Returns the key of the current theme.

### `toggleTheme` | function

Function that allows you to change the theme. It takes the key of the new theme as a parameter.

```tsx
const HomeScreen = ({ styles }) => {
  const { themeType, themeTypes, toggleTheme, currentTheme } = useWithStyle();

  const barStyle = themeType === "light" ? "dark-content" : "light-content";

  const handleToggleTheme = () => {
    toggleTheme(themeType === "light" ? "dark" : "light");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      <TouchableOpacity onPress={handleToggleTheme}>
        <Text style={styles.text}>Switch Theme</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
```
