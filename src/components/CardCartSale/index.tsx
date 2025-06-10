import React from 'react';
import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { formatCurrency } from '@utils/formatters';
import { AdvancedButton } from '@components/AdvancedButton';
import * as models from '@models/types';

import styles from './styles';

interface Props {
  item: Partial<models.IProduct> | models.IProduct;
  addMore?: (item: Partial<models.IProduct>) => void;
  minusItem?: (item: Partial<models.IProduct>) => void;
  removeItem?: (item: Partial<models.IProduct>) => void;
  detailsItem?: (item: models.IProduct) => void;
  editItem?: (item: models.IProduct) => void;
}
export const CardCartSale = (props: Props) => {
  const { item, addMore, minusItem, removeItem, detailsItem, editItem } = props;

  return (
    <View style={styles.box}>
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
          <Text style={styles.text}>{formatCurrency(Number(item.price))}</Text>
        </View>
      </View>
      <View style={styles.side_rigth}>
        {(item.amount === 1 && removeItem) &&
          <AdvancedButton
            icon={'trash-2'}
            type="primary"
            width={50}
            onPress={() => removeItem(item)}
            style={styles.buttonIconContainer}
            iconStyle={styles.buttonIcon}
            iconSize={styles.buttonIcon.width}
          />
        }
        {(Number(item.amount) > 1 && minusItem) &&
          <AdvancedButton
            icon={'minus-circle'}
            type="primary"
            width={50}
            onPress={() => minusItem(item)}
            style={styles.buttonIconContainer}
            iconStyle={styles.buttonIcon}
            iconSize={styles.buttonIcon.width}
          />
        }
        {addMore &&
          <AdvancedButton
            icon={'plus-circle'}
            type="primary"
            width={50}
            onPress={() => addMore(item)}
            style={styles.buttonIconContainer}
            iconStyle={styles.buttonIcon}
            iconSize={styles.buttonIcon.width}
          />
        }
        {detailsItem &&
          <AdvancedButton
            icon={'plus-circle'}
            type="primary"
            width={50}
            onPress={() => detailsItem(item as models.IProduct)}
            style={styles.buttonIconContainer}
            iconStyle={styles.buttonIcon}
            iconSize={styles.buttonIcon.width}
          />
        }
        {editItem &&
          <AdvancedButton
            icon={'plus-circle'}
            type="primary"
            width={50}
            onPress={() => editItem(item as models.IProduct)}
            style={styles.buttonIconContainer}
            iconStyle={styles.buttonIcon}
            iconSize={styles.buttonIcon.width}
          />
        }
      </View>
    </View>
  );
};
