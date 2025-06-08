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
    backgroundColor: colors.background.Primary,
    borderColor: colors.brand.Tertiary,
    borderWidth: 3,
    padding: 3,
    marginBottom: 12,
    borderRadius: 8,
  },
  label: {
    color: colors.text.Secondary,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.Primary,
    color: colors.text.Secondary,
    paddingHorizontal: 20,
  },
});
