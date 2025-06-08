import { NavigationProp, NavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { AdvacedInput, AdvancedButton, AdvancedIcon } from '@components/index';
import translate from '@services/i18n';
import { isValidEmail } from '@utils/validators';
import { useAuth } from '@contexts/AuthContext';
import { colors } from '@themes/colors';
import { redirect } from '@routes/Redirect';

import styles from '../styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const LoginScreen = (props: Props) => {
  const { navigation } = props;
  const { login, isAuthenticated, handleBiometricLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [blockLogin, setBlockLogin] = useState(true);

  const handleLogin = async () => {
    try {
      await login(email, password);

      const checkAuth = () =>
        new Promise<void>((resolve) => {
          const interval = setInterval(() => {
            if (isAuthenticated) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });

      await checkAuth();

      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeDrawer' }],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        Alert.alert('Erro', e.message);
      } else {
        Alert.alert('Erro desconhecido.');
      }
    }
  };

  const redirectRegiste = () => {
    redirect(navigation, { name: 'RegisterScreen' });
  };

  const redirectForgotPass = () => {
    redirect(navigation, { name: 'ForgotPasswordScreen' });
  };

  useEffect(() => {
    if (isValidEmail(email) && password.length > 6) {
      setBlockLogin(false);
    } else {
      setBlockLogin(true);
    }
  }, [email, password]);

  useEffect(() => {
    handleBiometricLogin(() => {
      redirect(navigation, { name: 'HomeDrawer' });
    });
  }, []);

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
        <Text style={styles.title}>{translate('PAGE.AUTH.LOGIN_SCREEM.TITLE')}</Text>

        <AdvacedInput
          placeholder={translate('PAGE.AUTH.LOGIN_SCREEM.FORM.EMAIL')}
          value={email}
          onChangeText={(t) => setEmail(t.trim())}
          autoCapitalize="none"
        />
        <AdvacedInput
          placeholder={translate('PAGE.AUTH.LOGIN_SCREEM.FORM.PASSWORD')}
          value={password}
          onChangeText={(t) => setPassword(t.trim())}
          secureTextEntry={!showPassword}
          rightIcon={renderIcon(() => setShowPassword(!showPassword), showPassword)}
        />
        <AdvancedButton
          title={translate('PAGE.AUTH.LOGIN_SCREEM.FORM.TO_ENTER')}
          onPress={handleLogin}
          disabled={blockLogin}
        />
        <AdvancedButton
          title={translate('PAGE.AUTH.LOGIN_SCREEM.FORM.TO_FORGOT_PASS')}
          onPress={redirectForgotPass}
          style={styles.button_Text}
          textColor={colors.text.Primary}
        />
      </View>

      <AdvancedButton
        title={translate('PAGE.AUTH.LOGIN_SCREEM.FORM.TO_REGISTER')}
        onPress={redirectRegiste}
        style={styles.button_Text}
        textColor={colors.text.Primary}
      />
    </View>
  );
};

export default LoginScreen;
