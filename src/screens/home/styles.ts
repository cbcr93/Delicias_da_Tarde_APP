import { fontScale } from '@services/dimensions';
import { colors } from '@themes/colors';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.Primary,
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
    shadowColor: colors.black, // cor da sombra
    shadowOffset: {
      width: 5, // deslocamento horizontal da sombra
      height: 5, // deslocamento vertical da sombra
    },
    shadowOpacity: 0.8, // opacidade da sombra (0 a 1)
    shadowRadius: 20,
    // Para Android, use elevation em vez de shadowOffset, shadowOpacity, shadowRadius
    ...(Platform.OS === 'android' && {
      elevation: 5,
    }),
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
