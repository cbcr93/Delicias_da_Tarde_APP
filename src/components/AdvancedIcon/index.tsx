import React from 'react';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '@themes/colors';

export const AdvancedIcon = (
  type: string,
  // eslint-disable-next-line
  iconName: any,
  size = 24,
  color = colors.text.Primary,
) => {
  const IconComponent = {
    Feather,
    MaterialIcons,
    Ionicons,
  }[type];

  if (!IconComponent) {
    console.warn(`Icon type ${type} not found`);
    return null;
  }

  return <IconComponent name={iconName} size={size} color={color} />;
};
