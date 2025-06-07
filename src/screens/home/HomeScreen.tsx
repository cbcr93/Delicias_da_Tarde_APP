import { Text, View } from 'react-native';
import styles from '@styles/global.styles';
import translate from '@services/i18n';
import { AdvancedButton, ItemList } from '@components/index';
import { NavigationProp, NavigationState } from '@react-navigation/native';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const HomeScreen = (props: Props) => {
  const { navigation } = props;

  const redirect = () => {
    navigation.navigate({
      name: 'Details',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.HOME.TEXT')}</Text>
      <AdvancedButton
        title={translate('ROUTER.DETAILS.BUTTON_SEND_NAVIGATION')}
        onPress={redirect}
      />
      <ItemList />
    </View>
  );
};

export default HomeScreen;
