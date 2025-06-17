import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import translate from '@services/i18n';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (range: { startDate: string; endDate: string }) => void;
}

export const AdvancedDatePickers = ({ visible, onClose, onConfirm }: Props) => {
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setStartPickerVisible(false);
    setEndPickerVisible(false);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const normalizedStart = new Date(Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0, 0, 0, 0
      ));

      const normalizedEnd = new Date(Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        23, 59, 59, 999
      ));

      onConfirm({ startDate: normalizedStart.toISOString(), endDate: normalizedEnd.toISOString() });
      reset();
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{translate('COMPONENTS.ADAVANCED_DATE_PICKERS.TITLE')}</Text>

          <TouchableOpacity onPress={() => setStartPickerVisible(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {startDate ? startDate.toLocaleDateString() : 'Data Inicial'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setEndPickerVisible(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>
              {endDate ? endDate.toLocaleDateString() : 'Data Final'}
            </Text>
          </TouchableOpacity>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.cancelText}>{'Cancelar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              disabled={!startDate || !endDate}
              style={[styles.apply, !(startDate && endDate) && styles.disabled]}
            >
              <Text style={styles.applyText}>{'Aplicar'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={startPickerVisible}
          mode="date"
          onConfirm={(date) => {
            setStartDate(date);
            setStartPickerVisible(false);
          }}
          onCancel={() => setStartPickerVisible(false)}
        />

        <DateTimePickerModal
          isVisible={endPickerVisible}
          mode="date"
          onConfirm={(date) => {
            setEndDate(date);
            setEndPickerVisible(false);
          }}
          onCancel={() => setEndPickerVisible(false)}
        />
      </View>
    </Modal>
  );
};