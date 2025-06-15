import { FlatList, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import { AdvacedInput } from '@components/AdvancedInput';
import { AdvancedIcon } from '@components/AdvancedIcon';
import translate from '@services/i18n';
import { CardProductSale } from '@components/CardProductSale';
import * as models from '@models/types';
import { RootState } from '@redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import * as productsThunks from '@redux/product/thunks';

import styles from './styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const RegisterSalesScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const [search, setSearch] = useState('');

  const { products } = useSelector((state: RootState) => state.product);

  // let products: models.ProductsEntities[] = []

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

  const addCart = (item: models.ProductsEntities) => {
    console.log(item);
  };

  const toDatails = (item: models.ProductsEntities) => {
    console.log(item);
    redirect(navigation, {
      name: 'ProductDetailsScreen',
      params: {
        options: {
          flag: 'add',
          item,
        },
      },
    });
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
              <CardProductSale item={item} addCart={addCart} toDatails={toDatails} />
            )}
          />
        ) : (
          <Text style={styles.text}>{'Estoque vazio.'}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <AdvancedButton
          title={translate('PAGE.SALES.REGISTER.TO_CART')}
          onPress={() =>
            redirect(navigation, { name: 'CartScreen', params: { options: { flag: 'add' } } })
          }
          style={styles.buttonContainer}
          icon="shopping-cart"
          iconSize={24}
        />
      </View>
    </View>
  );
};

export default RegisterSalesScreen;
