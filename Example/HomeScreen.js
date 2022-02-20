import React from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import withStyle from 'react-native-with-style';

const icons = {
  light: require('./assets/sun.png'),
  dark: require('./assets/moon.png'),
};

const HomeScreen = ({styles, themeType, toggleTheme}) => {
  const barStyle = themeType === 'dark' ? 'light-content' : 'dark-content';

  const handleToggleTheme = () => {
    toggleTheme(themeType === 'light' ? 'dark' : 'light');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={icons[themeType]} style={styles.image} />
        <TouchableOpacity onPress={handleToggleTheme}>
          <Text style={styles.text}>Switch Theme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = ({color}) => ({
  container: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: color.text,
    fontSize: 20,
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default withStyle(HomeScreen, style);
