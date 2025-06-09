import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as authServices from '@services/auth';
import * as models from '@models/types';

type AuthContextType = {
  user: models.IloggedUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleBiometricLogin: (onSuccess?: () => void) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<models.IloggedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* const bootstrap = async () => {
      const enabled = await authServices.isBiometricEnabled();

      if (enabled) {
        const authenticated = await authServices.authenticateBiometric();
        if (authenticated) {
          const session = await authServices.loadSession();
          if (session) {
            await login(session.email, session.password);
          }
        }
      } else {
        const session = await authServices.loadSession();
        if (session) {
          await login(session.email, session.password);
        }
      }

      setIsLoading(false);
    };
    bootstrap(); */
    const loadSession = async () => {
      await authServices.loadSession();

      setIsLoading(false);
    };
    loadSession();
  }, []);

  const logout = async () => {
    setUser(null);
    await authServices.clearSession();
  };

  const login = async (email: string, password: string) => {
    const loggedUser = await authServices.login(email, password);
    setUser(loggedUser);
    await authServices.saveSession(loggedUser);

    const alreadyEnabled = await authServices.isBiometricEnabled();

    if (!alreadyEnabled) {
      Alert.alert('Ativar biometria?', 'Deseja usar biometria para login automático?', [
        {
          text: 'Sim',
          onPress: async () => await authServices.enableBiometric(email, password),
        },
        {
          text: 'Não',
          style: 'cancel',
        },
      ]);
    }
  };

  const handleBiometricLogin = async (onSuccess?: () => void) => {
    try {
      const auth = await authServices.authenticateBiometric();
      if (!auth) return;

      const credentials = await authServices.getBiometricCredentials();

      if (!credentials) {
        await authServices.disableBiometric();
        Alert.alert('Credenciais não encontradas');
        return;
      }

      const { email, password } = credentials;
      const loggedUser = await authServices.login(email, password);

      setUser(loggedUser);
      await authServices.saveSession(loggedUser);

      if (onSuccess) onSuccess();
    } catch (e: unknown) {
      if (e instanceof Error) {
        Alert.alert('Erro no login biométrico', e.message);
      } else {
        Alert.alert('Erro desconhecido!');
      }
      await authServices.disableBiometric();
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading, isAuthenticated: !!user, handleBiometricLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider');
  return context;
};
