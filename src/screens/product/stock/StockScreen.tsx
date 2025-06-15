import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { AdvacedInput, AdvancedButton, AdvancedIcon, CardCartSale } from '@components/index';
import { RootState } from '@redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as productsThunks from '@redux/product/thunks';
import { AppDispatch } from '@redux/store';

import styles from './styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const StockScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;

  const [search, setSearch] = useState('');

  const { products } = useSelector((state: RootState) => state.product);

  const loadItems = async () => {
    if (search) {
      dispatch(productsThunks.searchProduct(search));
    } else {
      dispatch(productsThunks.fetchProduct());
    }
  };

  useEffect(() => {
    dispatch(productsThunks.fetchProduct());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadItems();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const redirectBackOrHome = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      redirect(navigation, { name: 'Home' });
    }
  };

  const redirectAddOrEdit = (flag: string, item: models.ProductsEntities | null) => {
    redirect(navigation, { name: 'AddOrEditProductScreen', params: { options: { flag, item } } });
  };

  const redirectDetails = (flag: string, item: models.ProductsEntities) => {
    redirect(navigation, { name: 'ProductDetailsScreen', params: { options: { flag, item } } });
  };

  return (
    <View style={styles.container}>
      <AdvacedInput
        placeholder={translate('PAGE.SALES.REGISTER.SEARCH')}
        value={search}
        onChangeText={setSearch}
        viewStyle={styles.search}
        style={styles.input}
        rightIcon={<View>{AdvancedIcon('Feather', 'search', 20, styles.search.borderColor)}</View>}
      />

      <View style={styles.content}>
        {products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            renderItem={({ item }) => (
              <CardCartSale
                item={item}
                detailsItem={(item) => redirectDetails('edit', item)}
                editItem={(item) => redirectAddOrEdit('edit', item)}
              />
            )}
          />
        ) : (
          <Text style={styles.text}>{'Estoque vazio.'}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <AdvancedButton
          title={'Cadastrar Produto'}
          onPress={() => redirectAddOrEdit('add', null)}
          style={styles.buttonContainer}
        />

        <AdvancedButton
          title={translate('SHARED.BACK')}
          onPress={redirectBackOrHome}
          style={styles.button_Text}
          textColor={styles.button_Text.color}
        />
      </View>
    </View>
  );
};

export default StockScreen;
