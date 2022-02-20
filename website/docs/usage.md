---
id: usage
title: Usage
slug: /usage
hide_table_of_contents: true
hide_title: true
---

## Usage

### Provider

Before using with styles in your application, you need to wrap your app with `ThemeProvider` first.

> ThemeProvider only takes `theme` and `default Theme` props.

```jsx
const theme = {
  pallets: {
    light: {
      background: "black",
    },
    dark: {
      background: "white",
    },
    blue: {
      background: "darkBlue",
    },
  },
  fonts: {
    default: "roboto",
  },
};
```

> If you want to load different color palettes, you need to give these palettes in `colors`.
> The keys you use here are important. You will use these keys when changing the theme.

> The default value of `defaultTheme` is `light`. You can give this field one of your color palettes under colors.

> You can also use the value `system` If you pass it to `system` it will use the device's theme by default.

```jsx
import React from "react";
import { ThemeProvider } from "react-native-with-style";

const App = () => {
  return (
    <ThemeProvider theme={theme} defaultTheme="light">
      {/* Your app components */}
    </ThemeProvider>
  );
};

export default App;
```

### With Styles

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

### Component Props

# Takes 4 props wrapped with withStyle.

### `styles`
return the styles you created for the components

### `theme`
return the current theme if you want to do the styling directly in the component and not via styles

### `themeType`
Returns the key of the current theme.

### `toggleTheme`
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
