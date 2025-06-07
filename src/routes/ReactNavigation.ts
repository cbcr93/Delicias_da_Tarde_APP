/* eslint-disable */
import { RootStackParamList } from '@models/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
