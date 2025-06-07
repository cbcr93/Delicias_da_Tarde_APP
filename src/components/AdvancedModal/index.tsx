import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => Promise<void> | void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
  loading?: boolean;
  disabled?: boolean;
}

export const AdvancedModal = (props: Props) => {
  const {
    visible,
    onClose,
    title,
    description,
    children,
    showHeader = true,
    showFooter = true,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    loading = false,
    disabled = false,
  } = props;
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {showHeader && <Text style={styles.title}>{title}</Text>}

          {description && <Text style={styles.description}>{description}</Text>}

          <View style={styles.content}>{children}</View>

          {showFooter && (
            <View style={styles.footer}>
              <TouchableOpacity onPress={onCancel ?? onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onConfirm}
                style={disabled ? styles.confirmDisabledButton : styles.confirmButton}
                disabled={disabled}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.confirmText}>{confirmText}</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
