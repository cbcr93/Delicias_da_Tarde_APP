import { StyleSheet } from 'react-native';
import { colors } from '@themes/index';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background.Primary,
    flex: 1,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    color: colors.text.Primary,
  },
});
