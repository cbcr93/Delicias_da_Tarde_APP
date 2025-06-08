import { NavigationProp, NavigationState } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <AdvancedButton
          title={translate('PAGE.HOME.BUTTONS.REGISTER')}
          onPress={() => redirect(navigation, { name: 'RegisterSalesScreen' })}
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
          icon="book-open"
          iconSize={24}
        />
        <AdvancedButton
          title={translate('PAGE.HOME.BUTTONS.STOCK')}
          onPress={() => redirect(navigation, { name: 'StockScreen' })}
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
          icon="archive"
          iconSize={24}
        />
        <AdvancedButton
          title={translate('PAGE.HOME.BUTTONS.REPORT')}
          onPress={() => redirect(navigation, { name: 'GeneralReportScreen' })}
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
          icon="bar-chart-2"
          iconSize={24}
        />
        <AdvancedButton
          title={translate('PAGE.HOME.BUTTONS.CART')}
          onPress={() => redirect(navigation, { name: 'CartScreen' })}
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
          icon="shopping-cart"
          iconSize={24}
        />
        <AdvancedButton
          title={translate('PAGE.HOME.BUTTONS.ADD_PRODUCT')}
          onPress={() =>
            redirect(navigation, {
              name: 'AddOrEditProductScreen',
              params: { options: { flag: 'add' } },
            })
          }
          style={styles.buttonContainer}
          textStyle={styles.buttonText}
          icon="plus-circle"
          iconSize={24}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
