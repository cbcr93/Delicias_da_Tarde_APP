import { fontScale } from '@services/dimensions';
import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.background.Primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    marginTop: 12,
    backgroundColor: colors.components.content,
    padding: 10,
    flexDirection: 'row',
    width: '100%',
  },
  side_left: {
    flexDirection: 'column',
    width: '80%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontScale(24),
    color: colors.text.Primary,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  text: {
    textAlign: 'justify',
    fontSize: fontScale(12),
    padding: 12,
    color: colors.text.Primary,
  },
  input: {},
  icon: {
    color: colors.gray[700],
  },
  iconContent: {
    marginRight: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  criteriaContainer: {
    marginBottom: 10,
  },
  criteria: {
    marginLeft: 6,
    fontSize: fontScale(12),
    marginVertical: 2,
  },
  button_Text: {
    color: colors.text.Primary,
    backgroundColor: colors.background.Primary,
    marginBottom: 50,
  },
});
