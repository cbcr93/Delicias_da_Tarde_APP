import { StyleSheet } from 'react-native';
import { colors } from '@themes/index';
import { fontScale } from '@services/dimensions';

export default StyleSheet.create({
  containerBig: {
    borderColor: colors.brand.Tertiary,
    alignItems: 'center',
  },
  containerSmall: {
    borderColor: colors.brand.Tertiary,
    alignItems: 'center',
  },
  primaryContainer: {
    borderWidth: 3,
    borderRadius: 10,
  },
  secondaryContainer: {
    borderWidth: 0,
    borderRadius: 10,
  },
  label: {
    height: 25,
    paddingRight: 10,
    paddingLeft: 10,
    color: colors.text.Tertiary,
    fontWeight: '900',
    fontSize: fontScale(12),
    lineHeight: fontScale(25),
    textAlign: 'center',
  },
  labelSmall: {
    fontSize: fontScale(9),
  },
  button: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
