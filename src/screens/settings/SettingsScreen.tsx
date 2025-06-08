import { Text, View } from 'react-native';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { AdvancedButton } from '@components/AdvancedButton';
import translate from '@services/i18n';
import styles from '@styles/global.styles';
import { redirect } from '@routes/Redirect';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const SettingsScreen = (props: Props) => {
  const { navigation } = props;

  const redirectHome = () => {
    redirect(navigation, {
      name: 'Home',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.SETTINGS.TEXT')}</Text>
      <AdvancedButton
        title={translate('ROUTER.HOMETAB.BUTTON_SEND_NAVIGATION')}
        onPress={redirectHome}
      />
    </View>
  );
};

export default SettingsScreen;
