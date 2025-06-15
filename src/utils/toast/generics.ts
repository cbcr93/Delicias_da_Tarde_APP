import Toast, { ToastType } from 'react-native-toast-message';

interface Props {
  type: ToastType;
  title?: string;
  description?: string;
}

export const showToast = (props: Props) => {
  const { type, title, description, ...rest } = props;

  Toast.show({
    type: type,
    ...(title && { text1: title }),
    ...(description && { text2: description }),
    ...rest,
  });
};
