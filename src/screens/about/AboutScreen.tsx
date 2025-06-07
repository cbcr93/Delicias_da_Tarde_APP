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

const AboutScreen = (props: Props) => {
  const { navigation } = props;

  const redirect = () => {
    navigation.navigate({
      name: 'HomeTab',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('PAGE.ABOUT.TEXT')}</Text>
      <AdvancedButton
        title={translate('ROUTER.HOMETAB.BUTTON_SEND_NAVIGATION')}
        onPress={redirect}
      />
    </View>
  );
};

export default AboutScreen;
