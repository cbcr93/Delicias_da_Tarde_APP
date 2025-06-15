import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    justifyContent: 'space-between',
    width: '100%',
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
  box: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderColor: colors.brand.Tertiary,
    borderWidth: 1,
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
});
