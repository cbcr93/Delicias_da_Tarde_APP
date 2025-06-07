import { StyleSheet, Platform } from 'react-native';
import { colors, variables } from '@themes/index';

export default StyleSheet.create({
  overlay: {
    backgroundColor: colors.blackOpacity,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: variables.fontSizeH2,
    fontFamily: variables.fontFamilyBold,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
    marginHorizontal: 10,
  },
  text: {
    fontSize: variables.fontSizeBase,
    fontFamily: variables.fontFamily,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: '#888',
  },
  confirmButton: {
    backgroundColor: colors.components.bottomPrimary,
    padding: 10,
    borderRadius: 6,
  },
  confirmText: {
    color: colors.text.Primary,
    fontWeight: 'bold',
  },
  confirmDisabledButton: {
    backgroundColor: colors.components.bottomSecondary,
    padding: 10,
    borderRadius: 6,
  },
});
