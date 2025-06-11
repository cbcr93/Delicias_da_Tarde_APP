import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
  },
  content: {
    height: 200,
    flexGrow: 1,
    justifyContent: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
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
  footer: {
    paddingTop: 10,
    width: '100%',
    height: 140,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
    marginBottom: 35,
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.brand.Primary,
    borderColor: colors.brand.Primary,
    width: '90%',
    height: 60,
  },
  search: {
    width: 350,
    height: 50,
    margin: 10,
    borderColor: colors.brand.Tertiary,
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    backgroundColor: colors.brand.Primary,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
  },
});
