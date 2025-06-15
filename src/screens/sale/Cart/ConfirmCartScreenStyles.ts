import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 550,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
    marginBottom: 20,
  },
  footer: {
    paddingTop: 10,
    width: '100%',
    height: 210,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 1,
    marginBottom: 35,
  },
  buttonContainer: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
});
