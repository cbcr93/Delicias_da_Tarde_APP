import { Text, View } from 'react-native';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { AdvancedButton } from '@components/AdvancedButton';
import translate from '@services/i18n';
import styles from '@styles/global.styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const SettingsScreen = (props: Props) => {
  const { navigation } = props;

  const redirect = () => {
    navigation.navigate({
      name: 'HomeTab',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.SETTINGS.TEXT')}</Text>
      <AdvancedButton
        title={translate('ROUTER.HOMETAB.BUTTON_SEND_NAVIGATION')}
        onPress={redirect}
      />
    </View>
  );
};

export default SettingsScreen;
