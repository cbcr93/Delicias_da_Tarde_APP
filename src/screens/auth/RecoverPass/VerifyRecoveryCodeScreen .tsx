import { NavigationProp, NavigationState, RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { AdvacedInput, AdvancedButton, AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { isStrongPassword } from '@utils/validators';
import * as authServices from '@services/auth';
import * as FormatUtils from '@utils/formatters';
import { useAuth } from '@contexts/AuthContext';

import styles from '../styles';
import { colors } from '@themes/colors';
import { redirect } from '@routes/Redirect';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const VerifyRecoveryCodeScreen = (props: Props) => {
  const { navigation } = props;
  const { logout } = useAuth();

  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'VerifyRecoveryCodeScreen'>>();
  const email = route?.params?.options?.email;

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[\W_]/.test(password),
    });

    if (isStrongPassword(password) && password === confirmPassword && code.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword, code]);

  const redirectLogin = () => {
    redirect(navigation, {
      name: 'LoginScreen',
    });
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Este email não encontrado.');
      return;
    }
    try {
      setLoading(true);

      const valid = await authServices.validateRecoveryCode(email, code.trim());
      if (!valid) {
        Alert.alert('Código inválido ou expirado');
        return;
      }

      await authServices.resetUserPassword(email, password);
      await authServices.clearRecoveryCode(email);
      await logout();

      Alert.alert('Senha atualizada com sucesso!');

      redirectLogin();

      // eslint-disable-next-line
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  const renderCriteria = (label: string, valid: boolean) => (
    <Text style={[styles.criteria, { color: valid ? '#FFF' : '#888' }]}>{label}</Text>
  );

  const limmitCode = (t: string) => {
    if (t.length <= 6) {
      setCode(t.trim());
    } else {
      setCode(FormatUtils.formatTruncateString(t, { length: 6 }).trim());
    }
  };

  const renderIcon = (onPress: (() => void) | undefined, show: boolean) => (
    <TouchableOpacity onPress={onPress}>
      {show
        ? AdvancedIcon('Feather', 'eye', 20, styles.icon.color)
        : AdvancedIcon('Feather', 'eye-off', 20, styles.icon.color)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {translate('PAGE.AUTH.RECOVE_PASS.VERIFY_RECOVERY_CODE_SCREEN.TITLE')}
        </Text>

        <AdvacedInput
          placeholder={translate('PAGE.AUTH.RECOVE_PASS.VERIFY_RECOVERY_CODE_SCREEN.FORM.CODE')}
          value={code}
          onChangeText={limmitCode}
        />
        <AdvacedInput
          placeholder={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.PASSWORD')}
          value={password}
          onChangeText={(t) => {
            setPassword(t.trim());
          }}
          secureTextEntry={!showPassword}
          rightIcon={renderIcon(() => setShowPassword(!showPassword), showPassword)}
        />
        <AdvacedInput
          placeholder={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.CONFIRM_PASSWORD')}
          value={confirmPassword}
          secureTextEntry={!showConfirmPassword}
          onChangeText={(t) => setConfirmPassword(t.trim())}
          rightIcon={renderIcon(
            () => setShowConfirmPassword(!showConfirmPassword),
            showConfirmPassword,
          )}
        />

        <View style={styles.criteriaContainer}>
          {renderCriteria(translate('SHARED.PASSWORD_CRITERIA.MIN'), passwordCriteria.length)}
          {renderCriteria(
            translate('SHARED.PASSWORD_CRITERIA.UPPERCASE'),
            passwordCriteria.uppercase,
          )}
          {renderCriteria(
            translate('SHARED.PASSWORD_CRITERIA.LOWERCASE'),
            passwordCriteria.lowercase,
          )}
          {renderCriteria(translate('SHARED.PASSWORD_CRITERIA.NUMBER'), passwordCriteria.number)}
          {renderCriteria(translate('SHARED.PASSWORD_CRITERIA.SPECIAL'), passwordCriteria.special)}
          {renderCriteria(
            translate('SHARED.PASSWORD_CRITERIA.SAME'),
            password.length > 0 && password === confirmPassword,
          )}
        </View>

        <AdvancedButton
          title={
            loading
              ? translate('PAGE.AUTH.RECOVE_PASS.VERIFY_RECOVERY_CODE_SCREEN.FORM.SENDING')
              : translate('PAGE.AUTH.RECOVE_PASS.VERIFY_RECOVERY_CODE_SCREEN.FORM.RESET_PASS')
          }
          onPress={handleResetPassword}
          style={styles.button}
          disabled={disabled}
        />
      </View>
      <AdvancedButton
        title={translate('PAGE.AUTH.RECOVE_PASS.VERIFY_RECOVERY_CODE_SCREEN.FORM.TO_LOGIN')}
        onPress={redirectLogin}
        style={styles.button_Text}
        textColor={colors.text.Primary}
      />
    </View>
  );
};

export default VerifyRecoveryCodeScreen;
