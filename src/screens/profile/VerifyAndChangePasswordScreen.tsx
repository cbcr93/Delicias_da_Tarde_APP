import { NavigationProp, NavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { AdvacedInput, AdvancedButton, AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { isStrongPassword } from '@utils/validators';
import * as authServices from '@services/auth';
import { useAuth } from '@contexts/AuthContext';

import styles from './VerifyAndChangePasswordScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const VerifyAndChangePasswordScreen = (props: Props) => {
  const { navigation } = props;
  const { user } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
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

    if (isStrongPassword(password) && password === confirmPassword && oldPassword.length > 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword, oldPassword]);

  const handleResetPassword = async () => {
    console.log('email: ', { email: user?.email });
    if (!user?.email) {
      Alert.alert('Email não encontrado.');
      return;
    }
    try {
      setLoading(true);

      const valid = await authServices.validateResetPass(user?.email, oldPassword.trim());

      if (!valid) {
        Alert.alert('Senha antiga inválido.');
        return;
      }

      await authServices.resetUserPassword(user?.email, password);

      Alert.alert('Senha atualizada com sucesso!');

      navigation.navigate({
        name: 'ProfileScreen',
        params: {},
      });
      // eslint-disable-next-line
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    } finally {
      setLoading(false);
    }
  };

  const redirect = () => {
    navigation.navigate({
      name: 'ProfileScreen',
      params: {},
    });
  };

  const renderCriteria = (label: string, valid: boolean) => (
    <Text style={[styles.criteria, { color: valid ? '#FFF' : '#888' }]}>{label}</Text>
  );

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
          {translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.TITLE')}
        </Text>

        <AdvacedInput
          placeholder={translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.OLD_PASSWORD')}
          value={oldPassword}
          onChangeText={(t) => {
            setOldPassword(t.trim());
          }}
        />
        <AdvacedInput
          placeholder={translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.PASSWORD')}
          value={password}
          onChangeText={(t) => {
            setPassword(t.trim());
          }}
          secureTextEntry={!showPassword}
          rightIcon={renderIcon(() => setShowPassword(!showPassword), showPassword)}
        />
        <AdvacedInput
          placeholder={translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.CONFIRM_PASSWORD')}
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
              ? translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.SENDING')
              : translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.RESET_PASS')
          }
          onPress={handleResetPassword}
          style={styles.button}
          disabled={disabled}
        />
      </View>
      <AdvancedButton
        title={translate('PAGE.PROFILE.VERIFY_CHANGE_PASS_SCREEN.FORM.TO_PROFILE')}
        onPress={redirect}
        style={styles.button_Text}
      />
    </View>
  );
};

export default VerifyAndChangePasswordScreen;
