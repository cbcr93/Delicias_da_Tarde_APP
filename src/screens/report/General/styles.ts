import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
    textAlign: 'justify',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.Primary,
    textAlignVertical: 'top',
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
  header: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: colors.brand.Tertiary,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  header_content: {
    paddingTop: 10,
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  geral_content: {
    alignItems: 'center',
    borderColor: colors.brand.Tertiary,
    borderRadius: 20,
    borderWidth: 1,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 165,
  },
  Icon: {
    width: 20,
    color: colors.brand.Tertiary,
  },
  search: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 'auto',
    height: 20,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.brand.Primary,
    borderColor: colors.brand.Primary,
    width: 'auto',
    height: 20,
    padding: 0,
    paddingHorizontal: 0,
    paddingTop: 15,
  },
});
