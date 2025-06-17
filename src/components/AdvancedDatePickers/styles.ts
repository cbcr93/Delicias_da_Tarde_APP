import { StyleSheet } from 'react-native';
import { colors } from '@themes/index';
import { fontScale } from '@services/dimensions';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.blackOpacityOptions[8],
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: colors.brand.Primary,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    padding: 12,
  },
  cancelText: {
    color: colors.gray[400],
    fontSize: 16,
  },
  apply: {
    backgroundColor: colors.brand.Tertiary,
    padding: 12,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  applyText: {
    color: colors.brand.Primary,
    fontSize: 16,
  },
});
