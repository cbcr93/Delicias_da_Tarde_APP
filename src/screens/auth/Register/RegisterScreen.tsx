import { NavigationProp, NavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { register } from '@services/auth';
import { AdvacedInput, AdvancedButton, AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { isStrongPassword } from '@utils/validators';
import { findUserByEmail } from '@database/repositories/users';

import styles from '../styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const RegisterScreen = (props: Props) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
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

    if (isStrongPassword(password) && password === confirmPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      Alert.alert('Este email já está em uso.');
      return;
    }

    try {
      await register({ email, password });
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    } catch (e: unknown) {
      if (e instanceof Error) {
        Alert.alert('Erro', e.message);
      } else {
        Alert.alert('Erro desconhecido.');
      }
    }
  };

  const redirect = () => {
    navigation.navigate({
      name: 'LoginScreen',
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
        <Text style={styles.title}>{translate('PAGE.AUTH.REGISTER_SCREEM.TITLE')}</Text>

        <AdvacedInput
          placeholder={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.EMAIL')}
          value={email}
          onChangeText={(t) => setEmail(t.trim())}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <AdvacedInput
          placeholder={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.PASSWORD')}
          value={password}
          onChangeText={(t) => setPassword(t.trim())}
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
          title={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.REGISTER')}
          onPress={handleRegister}
          style={styles.button}
          disabled={disabled}
        />
      </View>
      <AdvancedButton
        title={translate('PAGE.AUTH.REGISTER_SCREEM.FORM.TO_LOGIN')}
        onPress={redirect}
        style={styles.button_Text}
      />
    </View>
  );
};

export default RegisterScreen;
