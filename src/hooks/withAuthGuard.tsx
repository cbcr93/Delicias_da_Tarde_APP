import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';

/* eslint-disable */
export const withAuthGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const navigation = useNavigation();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        Alert.alert('Sessão expirada', 'Sua sessão expirou. Por favor, faça login novamente.');

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }, 100);
      }
    }, [isAuthenticated, isLoading]);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return <Component {...props} />;
  };
};
