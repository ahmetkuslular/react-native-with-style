---
id: with-style
title: With Style
slug: /with-style
hide_table_of_contents: true
hide_title: true
---

# With Style

`withStyle` is a high order function. You need to give your component as a parameter. You do not need to use StyleSheet again for the style function you will create. `withStyle` does this for you

:::note
The styles function you created takes other fields as parameters, such as the color and fonts you pass in the theme.
:::

```jsx
import withStyle from "react-native-with-style";

const styles = ({ color, fonts }) => ({
  container: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.default,
  },
});

export default withStyle(HomeScreen, styles);
```

# Component Props

> Takes 5 props wrapped with withStyle.

### `styles` | object

return the styles you created for the components

### `currentTheme` | object

return the current theme if you want to do the styling directly in the component and not via styles

### `themeTypes` | array

Returns the key of the all themes.

### `themeType` | string

Returns the key of the current theme.

### `toggleTheme` | function

Function that allows you to change the theme. It takes the key of the new theme as a parameter.

```tsx
const HomeScreen = ({ styles, themeType, toggleTheme, theme }) => {
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
