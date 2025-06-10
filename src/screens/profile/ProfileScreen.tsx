import { useEffect, useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';
import { colors } from '@themes/colors';
import { getUserStatusText, getUserTypeText } from '@enum/users';
import { redirect } from '@routes/Redirect';
import * as authServices from '@services/auth';

import styles from './ProfileScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ProfileScreen = (props: Props) => {
  const { navigation } = props;

  const { user, logout } = useAuth();
  const [isEnabledBiometry, setIsEnabledBiometry] = useState(false);

  const toggleSwitchBiometry = async () => {

    if (!isEnabledBiometry === false) {
      Alert.alert('Desativar biometria?', 'Deseja desabilitar biometria para login automático?', [
        {
          text: 'Sim',
          onPress: async () => {
            await authServices.disableBiometric();
            setIsEnabledBiometry(false);
          },
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]);
    };

    if (!isEnabledBiometry === true) {
      const alreadyEnabled = await authServices.isBiometricEnabled();

      if (!alreadyEnabled && user) {
        Alert.alert('Ativar biometria?', 'Deseja usar biometria para login automático?', [
          {
            text: 'Sim',
            onPress: async () => {
              await authServices.enableBiometric(user.email, user.password);
              setIsEnabledBiometry(true);
            },
          },
          {
            text: 'Não',
            style: 'cancel',
          },
        ]);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handlePasswordReset = () => {
    if (!user?.email) {
      Alert.alert('Erro', 'Email não encontrado.');
      return;
    }

    redirect(navigation, {
      name: 'VerifyAndChangePasswordScreen',
    });
  };

  useEffect(() => {
    const validationBiometry = async () => {
      const enabled = await authServices.isBiometricEnabled();
      setIsEnabledBiometry(enabled)
    }

    validationBiometry()

  }, [isEnabledBiometry])

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

          <View style={styles.switchBox}>
            <Text style={styles.label}>{
              // translate('PAGE.PROFILE.PROFILE_SCREEN.LABEL.STATUS')
              'Biometria ativa ao logar?'
            }</Text>

            <Switch
              trackColor={{ true: colors.gray[300], false: colors.gray[500] }}
              thumbColor={isEnabledBiometry ? colors.brand.Tertiary : colors.gray[200]}
              onValueChange={toggleSwitchBiometry}
              value={isEnabledBiometry}
            />
          </View>
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
        style={{
          ...styles.buttonContainer,
          backgroundColor: colors.brand.Secondary,
          borderColor: colors.brand.Secondary,
        }}
        textColor={colors.text.Tertiary}
      />
    </View>
  );
};
export default ProfileScreen;
