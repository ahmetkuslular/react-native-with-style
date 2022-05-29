import {StyleSheet} from 'react-native';

export default {
  create(styleHash) {
    return StyleSheet.create(styleHash);
  },

  resolve(styles) {
    return {style: styles};
  },
};
