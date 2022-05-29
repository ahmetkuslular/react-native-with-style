---
id: provider
title: Provider
slug: /provider
hide_table_of_contents: true
hide_title: true
---

# Provider

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
  //You can pass other style elements you use. eg size, margin/padding values etc
  ...otherStyleElements,
};
```

> If you want to load different color palettes, you need to give these palettes in `colors`.
> The keys you use here are important. You will use these keys when changing the theme.

> The default value of `defaultTheme` is `light`. You can give this field one of your color palettes under colors.

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

#### System Theme

You can also use the value `system` If you pass it to `system` it will use the device's theme by default.

```jsx
import { ThemeProvider } from "react-native-with-style";

const App = () => {
  return (
    <ThemeProvider theme={theme} defaultTheme="system">
      {/* Your app components */}
    </ThemeProvider>
  );
};

export default App;
```
