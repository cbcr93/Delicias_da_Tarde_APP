import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
  },
  text: {
    color: colors.text.Primary,
    textAlign: 'justify',
    paddingTop: 5,
  },
  text_content: {
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
    alignItems: 'baseline',
  },
  buttonContainer: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.brand.Primary,
    borderColor: colors.brand.Primary,
    width: '90%',
    height: 60,
  },
  footer: {
    paddingTop: 10,
    width: '100%',
    height: 150,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 1,
    marginBottom: 35,
  },
  input: {
    marginTop: 10,
    marginBottom: 20,
  },
  input_big: {
    height: 120,
    width: '100%',
    textAlign: 'justify',
  },
});
