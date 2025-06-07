import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@contexts/AuthContext';
import { useCryptoRotation } from '@hooks/useCryptoRotation';

import { NavigatorGate } from './NavigatorGate';

export default function Router() {
  useEffect(() => {
    useCryptoRotation();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigatorGate />
      </NavigationContainer>
    </AuthProvider>
  );
}
