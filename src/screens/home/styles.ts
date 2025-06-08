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
    marginTop: 20,
    textAlign: 'center',
    color: colors.text.Primary,
  },
  content: {
    marginTop: 20,
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 10,
    width: 150,
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    lineHeight: fontScale(16),
    textAlignVertical: 'center',
    width: 120,
    height: 50,
    // color: colors.text.Primary,
  },
});
