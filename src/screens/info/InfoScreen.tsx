import { Text, View } from 'react-native';
import translate from '@services/i18n';
import styles from '@styles/global.styles';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const InfoScreen = (props: Props) => {
  const { navigation } = props;

  const redirectHome = () => {
    redirect(navigation, {
      name: 'HomeStack',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.INFO.TEXT')}</Text>
      <AdvancedButton
        title={translate('ROUTER.HOMETAB.BUTTON_SEND_NAVIGATION')}
        onPress={redirectHome}
      />
    </View>
  );
};

export default InfoScreen;
