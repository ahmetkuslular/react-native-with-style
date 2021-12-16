import React from 'react';
import {ThemeProvider} from 'rn-with-styles';

import HomeScreen from './HomeScreen';

const theme = {
  colors: {
    dark: {
      background: '#000000',
    },
    light: {
      background: '#FFFFFF',
    },
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme} defaultTheme="light">
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
