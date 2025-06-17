import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { AdvacedInput } from '@components/AdvancedInput';
import translate from '@services/i18n';
import { AppDispatch } from '@redux/store';
import * as itemThunks from '@redux/items/thunks';
import { RootState } from '@redux/rootReducer';

import { AdvancedButton } from '../AdvancedButton';
import { AdvancedModal } from '../AdvancedModal';
import styles from './styles';

export const ItemList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState('');
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [addTitle, setAddTitle] = useState<string>('');
  const [addDescription, setAddDescription] = useState<string>('');
  const [disabled, setdisabled] = useState<boolean>(true);

  const { items } = useSelector((state: RootState) => state.item);

  const loadItems = async () => {
    if (search) {
      dispatch(itemThunks.searchItems(search));
    } else {
      dispatch(itemThunks.fetchItems());
    }
  };

  useEffect(() => {
    dispatch(itemThunks.fetchItems());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadItems();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (addTitle.length > 3 && addDescription.length > 3) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [addTitle, addDescription]);

  const handleAdd = async () => {
    dispatch(
      itemThunks.addItems({
        title: `Item ${addTitle}`,
        description: addDescription,
        orderIndex: items.length,
      }),
    );
    await loadItems();
    setAddDescription('');
    setAddTitle('');
    setModalAddVisible(false);
  };

  const handleDelete = async (id: number) => {
    dispatch(itemThunks.removeItemsById(id));
    await loadItems();
  };

  return (
    <View style={styles.container}>
      <AdvacedInput
        placeholder={translate('COMPONENTS.ITEM_LIST.SEARCH')}
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <AdvancedButton
        title={translate('COMPONENTS.ITEM_LIST.ADD')}
        onPress={() => setModalAddVisible(true)}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <View style={styles.side_left}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>

            <AdvancedButton
              icon={'trash-2'}
              type="primary"
              width={50}
              onPress={() => handleDelete(item.id!)}
              style={{
                borderRadius: 15,
              }}
            />
          </View>
        )}
      />
      <AdvancedModal
        visible={modalAddVisible}
        onClose={() => setModalAddVisible(false)}
        disabled={disabled}
        title={translate('COMPONENTS.ITEM_LIST.OUT')}
        children={
          <View>
            <AdvacedInput
              placeholder={translate('COMPONENTS.ITEM_LIST.MODAL_INPUT_TITLE')}
              value={addTitle}
              onChangeText={setAddTitle}
              style={styles.input}
            />
            <AdvacedInput
              placeholder={translate('COMPONENTS.ITEM_LIST.MODAL_INPUT_DESCRIPTION')}
              value={addDescription}
              onChangeText={setAddDescription}
              style={styles.input}
            />
          </View>
        }
        onConfirm={handleAdd}
      />
    </View>
  );
};
