import { Platform, Dimensions, PixelRatio } from 'react-native';

import { colors } from './colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';

export default {
  platformStyle,

  // Font
  DefaultFontSize: 16,
  fontFamily: 'Montserrat-Regula',
  fontFamilySemiBold: 'Montserrat-SemiBold',
  fontFamilyBold: 'Montserrat-Bold',
  fontSizeBase: platform === 'android' ? 12 : 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },
  get fontSizeH4() {
    return this.fontSizeBase * 1.2;
  },
  get fontSizeH5() {
    return this.fontSizeBase * 1;
  },

  // Text
  textColor: colors.oldGold,
  inverseTextColor: colors.oldGold,
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },

  // Title
  titleFontfamily: 'Montserrat-Bold',
  titleFontSize: 19,
  subTitleFontSize: 14,
  subtitleColor: colors.white,
  titleFontColor: colors.white,

  // Other
  borderRadiusBase: 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  inputGroupRoundedBorderRadius: 30,

  // Hex tranformation in RGB
  hexToRGB: (hex: string, alpha: number) => {
    let correctedHex = hex;

    if (/^#([A-Fa-f0-9]{3})$/.test(hex)) {
      const hexLetters = hex.substring(1).split('');
      if (hexLetters.length === 3) {
        correctedHex = [
          hexLetters[0],
          hexLetters[0],
          hexLetters[1],
          hexLetters[1],
          hexLetters[2],
          hexLetters[2],
        ].join('');
      }
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(correctedHex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    throw new Error('Bad Hex');
  },
};
