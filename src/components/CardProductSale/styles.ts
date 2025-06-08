import { fontScale } from '@services/dimensions';
import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.Primary,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
    marginRight: 6,
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
  text: {
    color: colors.text.Primary,
    textAlign: 'justify',
    paddingTop: 5
  },
  text_content: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    height: 200,
    flexGrow: 1,
    justifyContent: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderColor: colors.brand.Tertiary,
    borderWidth: 3,
    borderRadius: 20,
  },
  side_left: {
    width: '85%',
    paddingRight: 5,
  },
  side_rigth: {
    width: '15%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '90%',
    height: 60,
    borderRadius: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonIconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonIcon: {
    alignItems: 'center',
    width: 16,
  },
  footer: {
    paddingTop: 10,
    width: '100%',
    height: 100,
    alignItems: 'center',
    borderTopColor: colors.brand.Tertiary,
    borderTopWidth: 3,
    marginBottom: 35,
  },
});
