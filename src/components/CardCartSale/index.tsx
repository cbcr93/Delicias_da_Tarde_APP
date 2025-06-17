import React from 'react';
import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { formatCurrency } from '@utils/formatters';
import { AdvancedButton } from '@components/AdvancedButton';
import * as models from '@models/types';
import { colors } from '@themes/colors';

import styles from './styles';

interface Props {
  item: Partial<models.ProductsEntities> | models.ProductsEntities;
  addMore?: (item: Partial<models.ProductsEntities>) => void;
  minusItem?: (item: Partial<models.ProductsEntities>) => void;
  removeItem?: (item: Partial<models.ProductsEntities>) => void;
  detailsItem?: (item: models.ProductsEntities) => void;
  editItem?: (item: models.ProductsEntities) => void;
  flag?: string | null;
}
export const CardCartSale = (props: Props) => {
  const { item, addMore, minusItem, removeItem, detailsItem, editItem, flag } = props;

  return (
    <View
      style={{
        ...styles.box,
        ...(item.amount === '0' && { backgroundColor: colors.gray[200] }),
      }}
    >
      <View style={styles.side_left}>
        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.CART.NAME')}</Text>
        </View>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>

        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.CART.AMOUND')}</Text>
          <Text style={styles.text}>{`${item.amount} unidade(s)`}</Text>
        </View>

        <View style={styles.text_content}>
          <Text style={styles.title}>{translate('PAGE.SALES.CART.PRICE')}</Text>
          <Text style={styles.text}>{formatCurrency(Number(item.price) / 100)}</Text>
        </View>
      </View>
      {flag !== 'edit' && (
        <View style={styles.side_rigth}>
          {Number(item.amount) === 1 && removeItem && (
            <AdvancedButton
              icon={'trash-2'}
              type="primary"
              width={50}
              onPress={() => removeItem(item)}
              style={styles.buttonIconContainer}
              iconStyle={styles.buttonIcon}
              iconSize={styles.buttonIcon.width}
            />
          )}
          {Number(item.amount) > 1 && minusItem && (
            <AdvancedButton
              icon={'minus-circle'}
              type="primary"
              width={50}
              onPress={() => minusItem(item)}
              style={styles.buttonIconContainer}
              iconStyle={styles.buttonIcon}
              iconSize={styles.buttonIcon.width}
            />
          )}
          {addMore && (
            <AdvancedButton
              icon={'plus-circle'}
              type="primary"
              width={50}
              onPress={() => addMore(item)}
              style={styles.buttonIconContainer}
              iconStyle={styles.buttonIcon}
              iconSize={styles.buttonIcon.width}
            />
          )}
          {detailsItem && (
            <AdvancedButton
              icon={'eye'}
              type="primary"
              width={50}
              onPress={() => detailsItem(item as models.ProductsEntities)}
              style={styles.buttonIconContainer}
              iconStyle={styles.buttonIcon}
              iconSize={styles.buttonIcon.width}
            />
          )}
          {editItem && (
            <AdvancedButton
              icon={'edit'}
              type="primary"
              width={50}
              onPress={() => editItem(item as models.ProductsEntities)}
              style={styles.buttonIconContainer}
              iconStyle={styles.buttonIcon}
              iconSize={styles.buttonIcon.width}
            />
          )}
        </View>
      )}
    </View>
  );
};
