import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  text: {
    color: colors.text.Primary,
    textAlign: 'justify',
    paddingTop: 4,
    marginLeft: 10,
  },
  sub_title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.brand.Tertiary,
    borderRadius: 20,
    borderWidth: 3,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    padding: 5,
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
  text_content: {
    flexDirection: 'row',
  },
  text_content_last: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  text_content_row: {
    flexDirection: 'row',
  },
});
