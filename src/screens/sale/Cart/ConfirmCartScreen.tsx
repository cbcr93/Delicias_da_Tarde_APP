import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import { AdvancedIcon } from '@components/AdvancedIcon';
import { colors } from '@themes/colors';

import styles from './ConfirmCartScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ConfirmCartScreen = (props: Props) => {
  const { navigation } = props;

  const redirectHome = () => {
    redirect(navigation, { name: 'Home' });
  };

  const redirectRegisterSales = () => {
    redirect(navigation, { name: 'RegisterSalesScreen' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {AdvancedIcon('Feather', 'check-circle', 100, colors.brand.Tertiary)}

        <Text style={styles.title}>{translate('PAGE.SALES.CONFIRM.TEXT')}</Text>
      </View>

      <View style={styles.footer}>
        <AdvancedButton
          title={translate('PAGE.SALES.CONFIRM.TO_REGISTER_SALES')}
          onPress={redirectRegisterSales}
          style={styles.buttonContainer}
          icon="check-circle"
          iconSize={24}
        />

        <AdvancedButton
          title={translate('PAGE.SALES.CONFIRM.TO_HOME')}
          onPress={redirectHome}
          style={styles.buttonContainer}
          backgroundColor={colors.brand.Quaternary}
        />
      </View>
    </View>
  );
};

export default ConfirmCartScreen;
