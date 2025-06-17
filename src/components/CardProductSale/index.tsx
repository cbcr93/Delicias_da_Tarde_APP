import React from 'react';
import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { formatCurrency } from '@utils/formatters';
import { AdvancedButton } from '@components/AdvancedButton';
import * as models from '@models/types';

import styles from './styles';
import { colors } from '@themes/colors';

interface Props {
  item: models.ProductsEntities;
  toDatails: (item: models.ProductsEntities) => void;
  addCart: (item: models.ProductsEntities) => void;
}
export const CardProductSale = (props: Props) => {
  const { item, addCart, toDatails } = props;

  return (
    <View
      style={{
        ...styles.box,
        ...(item.amount === '0' && { backgroundColor: colors.gray[200] }),
      }}
    >
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
          <Text style={styles.text}>{formatCurrency(Number(item.price) / 100)}</Text>
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
          disabled={item.amount === '0'}
        />
      </View>
    </View>
  );
};
