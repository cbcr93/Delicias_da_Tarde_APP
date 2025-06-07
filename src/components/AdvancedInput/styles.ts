import { fontScale } from '@services/dimensions';
import { colors } from '@themes/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: '2%',
    paddingRight: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.text.Primary,
    padding: 3,
    marginBottom: 12,
    borderRadius: 8,
  },
  label: {
    color: colors.gray[700],
    fontSize: fontScale(10),
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.text.Primary,
    color: colors.gray[700],
    fontSize: fontScale(16),
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});
