import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton, AdvancedIcon } from '@components/index';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { FlatList } from 'react-native-gesture-handler';
import { formatCentStringToCurrency } from '@utils/formatters';
import { CardReport } from '@components/CardReport';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import * as salesThunks from '@redux/sales/thunks';
import { RootState } from '@redux/rootReducer';

import styles from './styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const GeneralReportScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const { sales, summary } = useSelector((state: RootState) => state.sales);

  const detailsItem = (item: models.SalesEntity | undefined) => {
    redirect(navigation, { name: 'CartScreen', params: { options: { flag: 'edit', item } } });
  };

  const searchByDate = (when: string) => {
    switch (when) {
      case 'today':
        console.log(Date.now());
        break;

      case 'week':
        break;

      case 'mounth':
        break;

      case 'personalized':
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(salesThunks.fetchSales());
    dispatch(salesThunks.fetchSalesSummaryByDateRange());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.search}>
              <AdvancedButton
                title={'Hoje'}
                onPress={() => searchByDate('today')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Semana'}
                onPress={() => searchByDate('week')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Mês'}
                onPress={() => searchByDate('mounth')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Personalizado'}
                onPress={() => searchByDate('personalized')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
            </View>

            <View style={styles.header_content}>
              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'shopping-bag', styles.Icon.width, styles.Icon.color)}
                <Text
                  style={styles.sub_title}
                >{`${summary?.amount_total_sales || 0} unidade(s)`}</Text>
                <Text style={styles.text}>
                  {translate('PAGE.REPORT.GENERAL.TOTAL_PRODUCTS_SALES')}
                </Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'dollar-sign', styles.Icon.width, styles.Icon.color)}
                <Text style={styles.sub_title}>
                  {formatCentStringToCurrency(
                    Number(summary?.price_total_sales.replace(/\D/g, '') || 0),
                  )}
                </Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.TOTAL_SALES')}</Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'bar-chart-2', styles.Icon.width, styles.Icon.color)}
                <Text style={styles.sub_title}>
                  {formatCentStringToCurrency(
                    Number(summary?.average_ticket_sales.replace(/\D/g, '') || 0),
                  )}
                </Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.AVERAGE_TICKETS')}</Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'archive', styles.Icon.width, styles.Icon.color)}
                <Text
                  style={styles.sub_title}
                >{`${summary?.amount_total_stoke || 0} unidade(s)`}</Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.TOTAL_STOKE')}</Text>
              </View>
            </View>
          </View>
        }
        data={sales}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => <CardReport item={item} detailsItem={(i) => detailsItem(i)} />}
      />
    </View>
  );
};

export default GeneralReportScreen;
