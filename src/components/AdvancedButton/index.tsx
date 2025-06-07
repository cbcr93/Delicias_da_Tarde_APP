import { ReactElement } from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '@themes/colors';

import styles from './styles';
import { AdvancedIcon } from '../AdvancedIcon';

interface Props {
  title?: string;
  onPress?: () => void;
  width?: string | number;
  height?: number;
  rounded?: boolean;
  icon?: string;
  image?: ReactElement;
  backgroundColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  type?: 'primary' | 'secondary';
  size?: 'big' | 'small';
}

export const AdvancedButton = (props: Props) => {
  const {
    title,
    onPress,
    width = 'auto',
    height = 50,
    rounded = false,
    icon,
    image,
    backgroundColor = colors.components.bottomPrimary,
    textColor = colors.text.Primary,
    loading = false,
    disabled = false,
    style,
    textStyle,
    type = 'primary',
    size = 'big',
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          width: width as DimensionValue,
          height,
          borderRadius: rounded ? height / 2 : 0,
          backgroundColor: backgroundColor,
          opacity: disabled ? 0.5 : 1,
        },
        size === 'big' ? styles.containerBig : styles.containerSmall,
        type === 'primary' ? styles.primaryContainer : styles.secondaryContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {image && image}
          {icon && (
            <View style={{ marginRight: title ? 8 : 0 }}>
              {AdvancedIcon('Feather', icon, 15, '#eee')}
            </View>
          )}
          {title && (
            <Text
              style={[
                size !== 'big' ? [styles.label, styles.labelSmall] : styles.label,
                styles.text,
                textStyle,
                { color: textColor },
              ]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
