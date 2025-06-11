import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.brand.Primary,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text.Primary,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.Primary,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: colors.text.Primary,
  },
  value: {
    fontSize: 16,
    color: colors.text.Primary,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
