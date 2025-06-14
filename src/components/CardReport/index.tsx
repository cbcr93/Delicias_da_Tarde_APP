import React from 'react';
import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { formatCurrency, formatRelativeDate } from '@utils/formatters';
import { AdvancedButton } from '@components/AdvancedButton';
import * as models from '@models/types';

import styles from './styles';
import { colors } from '@themes/colors';

interface Props {
  item: {
    id: string;
    date: Date | string;
    amamount_toal: number;
    price_total: string;
    finish: boolean;
    itens: Partial<models.IProduct>[];
  };
  detailsItem: (item: {
    id: string;
    date: Date | string;
    amamount_toal: number;
    price_total: string;
    finish: boolean;
    itens: Partial<models.IProduct>[];
  }) => void;
}
export const CardReport = (props: Props) => {
  const { item, detailsItem } = props;

  return (
    <View
      style={{
        ...styles.content,
        ...(!item.finish && {
          // backgroundColor: colors.gray[200],
          borderColor: colors.brand.Failure,
        }),
      }}
    >
      <View style={styles.side_left}>
        <View style={styles.text_content}>
          <Text
            style={{
              ...styles.sub_title,
            }}
          >
            {translate('PAGE.REPORT.GENERAL.DATE')}
          </Text>
          <Text style={styles.text}>{`${formatRelativeDate(item.date)}`}</Text>
        </View>

        <View style={styles.text_content}>
          <View style={styles.text_content}>
            <Text
              style={{
                ...styles.sub_title,
              }}
            >
              {translate('PAGE.REPORT.GENERAL.AMOUT')}
            </Text>
            <Text style={styles.text}>{`${item.amamount_toal}`}</Text>
          </View>

          <View style={styles.text_content_last}>
            <Text
              style={{
                ...styles.sub_title,
              }}
            >
              {translate('PAGE.REPORT.GENERAL.PRICE')}
            </Text>
            <Text style={styles.text}>{formatCurrency(Number(item.price_total) / 100)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.side_rigth}>
        <AdvancedButton
          icon={'eye'}
          type="primary"
          onPress={() => detailsItem(item)}
          style={styles.buttonIconContainer}
          iconStyle={styles.buttonIcon}
          iconSize={styles.buttonIcon.width}
        />
      </View>
    </View>
  );
};
