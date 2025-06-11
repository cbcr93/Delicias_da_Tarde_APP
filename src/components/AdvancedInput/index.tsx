import React, { ReactElement, useRef } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { styles } from './styles';

interface Props extends TextInputProps {
  label?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  viewStyle?: ViewStyle;
}
export const AdvacedInput = (props: Props) => {
  const { label, rightIcon, leftIcon, viewStyle, ...rest } = props;
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <Pressable onPress={focusInput}>
        <View style={[
          styles.container,
          viewStyle,
        ]}>
          {leftIcon}
          <TextInput ref={inputRef} style={styles.input} {...rest} />
          {rightIcon}
        </View>
      </Pressable>
    </>
  );
};
