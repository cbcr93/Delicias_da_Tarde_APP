import { Text, View } from 'react-native';
import translate from '@services/i18n';
import styles from '@styles/global.styles';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ConfirmCartScreen = (props: Props) => {
  const { navigation } = props;

  const redirect = () => {
    navigation.navigate({
      name: 'Home',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.SALES.CART.CONFIRM.TEXT')}</Text>
      <AdvancedButton title={translate('ROUTER.HOME.BUTTON_SEND_NAVIGATION')} onPress={redirect} />
    </View>
  );
};

export default ConfirmCartScreen;
