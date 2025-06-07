import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from '@i18n/i18n';
import { initDatabase } from '@database/schema';
import { store } from '@redux/store';
import stylesGlobal from '@styles/global.styles';
import Router from '@routes/Router';

export default function App() {
  useEffect(() => {
    initDatabase()
      .then(() => console.log('Banco de dados inicializado com sucesso!'))
      .catch((err) => console.log('Erro ao inicializar o banco:', err));
  }, []);

  return (
    <View style={stylesGlobal.container}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Router />
          </GestureHandlerRootView>
        </Provider>
      </I18nextProvider>
    </View>
  );
}
