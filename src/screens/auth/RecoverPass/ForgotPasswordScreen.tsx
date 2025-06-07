import { NavigationProp, NavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { AdvacedInput, AdvancedButton } from '@components/index';
import translate from '@services/i18n';
import { isValidEmail } from '@utils/validators';
import { findUserByEmail } from '@database/repositories/users';
import * as authServices from '@services/auth';

import styles from '../styles';
import { colors } from '@themes/colors';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ForgotPasswordScreen = (props: Props) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isValidEmail(email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  const handleSendCode = async () => {
    try {
      setLoading(true);

      const user = await findUserByEmail(email.trim());
      if (!user) {
        Alert.alert('Usuário não encontrado');
        return;
      }
      await authServices.clearRecoveryCode(email.trim());

      const code = authServices.generateRecoveryCode();
      await authServices.saveRecoveryCode(email.trim(), code);

      console.log('Código de recuperação gerado:', code); // Simula "envio"

      Alert.alert(
        'Código enviado',
        'Verifique seu e-mail (ou console) e insira o código na próxima tela.',
      );

      navigation.navigate({
        name: 'VerifyRecoveryCodeScreen',
        params: {
          options: { email: email.trim() },
        },
      });
      // eslint-disable-next-line
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar o código de recuperação.');
    } finally {
      setLoading(false);
    }
  };
  const redirect = () => {
    navigation.navigate({
      name: 'LoginScreen',
      params: {},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {translate('PAGE.AUTH.RECOVE_PASS.FORGOT_PASS_SCREEM.TITLE')}
        </Text>

        <AdvacedInput
          placeholder={translate('PAGE.AUTH.RECOVE_PASS.FORGOT_PASS_SCREEM.FORM.EMAIL')}
          value={email}
          onChangeText={(t) => {
            setEmail(t.trim());
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <AdvancedButton
          title={
            loading
              ? translate('PAGE.AUTH.RECOVE_PASS.FORGOT_PASS_SCREEM.FORM.SENDING')
              : translate('PAGE.AUTH.RECOVE_PASS.FORGOT_PASS_SCREEM.FORM.CODE')
          }
          onPress={handleSendCode}
          style={styles.button}
          disabled={loading || disabled}
        />
      </View>
      <AdvancedButton
        title={translate('PAGE.AUTH.RECOVE_PASS.FORGOT_PASS_SCREEM.FORM.TO_LOGIN')}
        onPress={redirect}
        style={styles.button_Text}
        textColor={colors.text.Primary}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
