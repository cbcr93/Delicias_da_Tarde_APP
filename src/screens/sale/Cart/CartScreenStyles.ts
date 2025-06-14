import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
    marginBottom: 20,
  },
  sub_title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
  },
  text: {
    color: colors.text.Primary,
    textAlign: 'justify',
    paddingTop: 3,
  },
  text_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
    height: 210,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
    marginBottom: 35,
  },
  footer_flat: {
    paddingTop: 10,
    width: '100%',
    height: 150,
    alignItems: 'center',
    borderBottomColor: colors.brand.Tertiary,
    borderBottomWidth: 3,
    paddingBottom: 35,
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.brand.Primary,
    borderColor: colors.brand.Primary,
    width: '90%',
    height: 60,
  },
});
