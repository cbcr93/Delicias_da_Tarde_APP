import { Alert, Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';
import { colors } from '@themes/colors';
import { getUserStatusText, getUserTypeText } from '@enum/users';

import styles from './ProfileScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ProfileScreen = (props: Props) => {
  const { navigation } = props;
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handlePasswordReset = () => {
    if (!user?.email) {
      Alert.alert('Erro', 'Email não encontrado.');
      return;
    }

    navigation.navigate({
      name: 'VerifyAndChangePasswordScreen',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{translate('PAGE.PROFILE.PROFILE_SCREEN.TITLE')}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>{translate('PAGE.PROFILE.PROFILE_SCREEN.LABEL.EMAIL')}</Text>
          <Text style={styles.value}>{user?.email}</Text>

          <Text style={styles.label}>
            {translate('PAGE.PROFILE.PROFILE_SCREEN.LABEL.LAST_LOGIN')}
          </Text>
          <Text style={styles.value}>{user?.lastLogin || 'N/A'}</Text>

          <Text style={styles.label}>{translate('PAGE.PROFILE.PROFILE_SCREEN.LABEL.TYPE')}</Text>
          <Text style={styles.value}>{getUserTypeText(user?.type ? user?.type : 0) || 'N/A'}</Text>

          <Text style={styles.label}>{translate('PAGE.PROFILE.PROFILE_SCREEN.LABEL.STATUS')}</Text>
          <Text style={styles.value}>
            {getUserStatusText(user?.status ? user?.status : 0) || 'N/A'}
          </Text>
        </View>

        <AdvancedButton
          title="Redefinir Senha"
          onPress={handlePasswordReset}
          style={styles.buttonContainer}
        />
      </View>

      <AdvancedButton
        title="Sair"
        onPress={handleLogout}
        style={{ ...styles.buttonContainer, backgroundColor: colors.brand.Danger }}
      />
    </View>
  );
};
export default ProfileScreen;
