import { NavigationProp, NavigationState } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { redirect } from '@routes/Redirect';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/index';
import styles from './styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const HomeScreen = (props: Props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('PAGE.HOME.TEXT')}</Text>
      <View style={styles.content}>
        <AdvancedButton
          title={'Registrar Venda'}
          onPress={() => redirect(navigation, { name: 'RegisterSalesScreen' })}
          style={styles.buttonContainer}
          icon=''
        />
        <AdvancedButton
          title={'Estoque'}
          onPress={() => redirect(navigation, { name: 'StockScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'Relatórios'}
          onPress={() => redirect(navigation, { name: 'GeneralReportScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'CartScreen'}
          onPress={() => redirect(navigation, { name: 'CartScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'AddOrEditProductScreen'}
          onPress={() => redirect(navigation, { name: 'AddOrEditProductScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'ProductDetailsScreen'}
          onPress={() => redirect(navigation, { name: 'ProductDetailsScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'ConfirmCartScreen'}
          onPress={() => redirect(navigation, { name: 'ConfirmCartScreen' })}
          style={styles.buttonContainer}
        />
        <AdvancedButton
          title={'DetailsReportScreen'}
          onPress={() => redirect(navigation, { name: 'DetailsReportScreen' })}
          style={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
