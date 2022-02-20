import React from 'react';
import {ThemeProvider} from 'react-native-with-style';

import HomeScreen from './HomeScreen';

const theme = {
  pallets: {
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
    <ThemeProvider theme={theme} defaultTheme="system">
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
