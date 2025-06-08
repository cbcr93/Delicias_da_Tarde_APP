import React from 'react';
import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { formatCurrency } from '@utils/formatters';
import { AdvancedButton } from '@components/AdvancedButton';

import styles from './styles';

interface Props {
  item: any;
  toDatails: (item: any) => void;
  addCart: (item: any) => void;
}
export const CardProductSale = (props: Props) => {
  const { item, addCart, toDatails } = props;

  return (
    <View style={styles.box}>
      <View style={styles.side_left}>
        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.REGISTER.NAME')}</Text>
          <Text style={{ ...styles.text, width: 200 }} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>

        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.REGISTER.DESCRIPTION')}</Text>
        </View>
        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>

        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.REGISTER.TYPE')}</Text>
          <Text style={styles.text}>{item.type}</Text>
        </View>

        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.REGISTER.PRICE')}</Text>
          <Text style={styles.text}>{formatCurrency(Number(item.price))}</Text>
        </View>
      </View>
      <View style={styles.side_rigth}>
        <AdvancedButton
          icon={'eye'}
          type="primary"
          width={50}
          onPress={() => toDatails(item)}
          style={styles.buttonIconContainer}
          iconStyle={styles.buttonIcon}
          iconSize={styles.buttonIcon.width}
        />

        <AdvancedButton
          icon={'plus-circle'}
          type="primary"
          width={50}
          onPress={() => addCart(item)}
          style={styles.buttonIconContainer}
          iconStyle={styles.buttonIcon}
          iconSize={styles.buttonIcon.width}
        />
      </View>
    </View>
  );
};
