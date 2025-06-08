import { fontScale } from '@services/dimensions';
import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.Primary,
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
    justifyContent: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
    padding: 20,
  },
  buttonContainer: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center',
  },
  footer: {
    paddingTop: 10,
    width: '100%',
    height: 150,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
    marginBottom: 35,
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.background.Primary,
    borderColor: colors.background.Primary,
    width: '90%',
    height: 60,
  },
});
