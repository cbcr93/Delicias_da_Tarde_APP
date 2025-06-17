import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { NavigationProp, NavigationState, RouteProp, useRoute } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { formatCentStringToCurrency, formatCurrency } from '@utils/formatters';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { colors } from '@themes/colors';
import { AdvancedButton, CardCartSale } from '@components/index';
import * as cartThunks from '@redux/cart/thunks';
import * as salesThunks from '@redux/sales/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store';
import { RootState } from '@redux/rootReducer';
import { showToast } from '@utils/toast';
import { useAuth } from '@contexts/AuthContext';

import styles from './CartScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

type CartItemDetails = {
  id: string;
  date: Date | string;
  amamount_toal: number;
  price_total: string;
  finish: boolean;
  itens: Partial<models.ProductsEntities>[];
};

const CartScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const { user } = useAuth();

  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'CartScreen'>>();
  const flag = route?.params?.options?.flag;
  const itemDetails = route?.params?.options?.item as models.SalesEntity | null | undefined;

  const [totalAmount, SetTotalAmount] = useState(0);
  const [totalPrice, SetTotalPrice] = useState(0);
  const [Itens, SetItens] = useState<Partial<models.ProductsEntities>[]>([]);
  const [finish, SetFinish] = useState<boolean | null>(null);

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (flag === 'edit' && itemDetails) {
      SetItens(itemDetails.items as Partial<models.ProductsEntities>[]);
      SetTotalAmount(Number(itemDetails.amount_total));
      SetTotalPrice(Number(itemDetails.price_total.replace(/\D/g, '')));
      SetFinish(itemDetails.finish);
    }
    if (flag === 'add') {
      SetTotalAmount(cart.reduce((acc, item) => acc + (Number(item.amount) ?? 0), 0));
      SetTotalPrice(cart.reduce((acc, item) => acc + (Number(item.price) ?? 0), 0));
      SetItens(cart);
    }
  }, [itemDetails, flag, cart]);

  const redirectBackOrHome = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      redirect(navigation, { name: 'Home' });
    }
  };

  const finishSales = () => {
    const body: models.ISaleCreate = {
      price_total: formatCentStringToCurrency(totalPrice).replace(/\D/g, ''),
      amount_total: totalAmount.toString(),
      finish: true,
      user_id: user?.id,
      itens: cart,
    };

    dispatch(salesThunks.addSale(body));

    redirect(navigation, { name: 'ConfirmCartScreen' });
  };

  const ediFinishSales = (finish: boolean) => {
    if (itemDetails) dispatch(salesThunks.editFinishSale(itemDetails, finish));
  };

  const addMore = (item: models.ProductsEntities) => {
    if (item) {
      dispatch(cartThunks.addCart(item));
    }
  };

  const removeItem = (item: models.ProductsEntities) => {
    if (item) {
      dispatch(cartThunks.removeCartById(item));
    }
  };

  const clearCart = () => {
    dispatch(cartThunks.removeAllCart());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Itens}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <CardCartSale
            item={item}
            addMore={(item) => addMore(item as models.ProductsEntities)}
            minusItem={(item) => removeItem(item as models.ProductsEntities)}
            removeItem={(item) => removeItem(item as models.ProductsEntities)}
            flag={flag}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              ...styles.footer_flat,
              ...(itemDetails &&
                !finish && {
                  backgroundColor: colors.gray[200],
                }),
            }}
          >
            <Text style={styles.title}>{translate('PAGE.SALES.CART.RESUME')}</Text>

            <View style={styles.text_content}>
              <Text style={styles.sub_title}>{translate('PAGE.SALES.CART.AMOUNT_TOTAL')}</Text>
              <Text style={styles.text}>{`${totalAmount} unidade(s)`}</Text>
            </View>

            <View style={styles.text_content}>
              <Text style={styles.sub_title}>{translate('PAGE.SALES.CART.PRICE_TOTAL')}</Text>
              <Text style={styles.text}>{formatCentStringToCurrency(totalPrice)}</Text>
            </View>
          </View>
        )}
      />

      <View
        style={
          flag === 'add'
            ? styles.footer
            : {
                ...styles.footer,
                height: 150,
              }
        }
      >
        {flag === 'add' && (
          <>
            <AdvancedButton
              title={translate('PAGE.SALES.CART.CONFIRM')}
              onPress={finishSales}
              style={styles.buttonContainer}
              icon="check-circle"
              iconSize={24}
              disabled={Itens.length === 0}
            />

            <AdvancedButton
              title={translate('PAGE.SALES.CART.CLEAR_CART')}
              onPress={clearCart}
              style={{
                ...styles.buttonContainer,
                borderColor: colors.brand.Quaternary,
              }}
              icon="trash-2"
              iconSize={24}
              backgroundColor={colors.brand.Quaternary}
              disabled={Itens.length === 0}
            />
          </>
        )}

        {flag === 'edit' && finish && (
          <AdvancedButton
            title={translate('PAGE.SALES.CART.FINISH_SALES_NOT')}
            onPress={() => ediFinishSales(false)}
            style={{
              ...styles.buttonContainer,
              backgroundColor: colors.brand.Secondary,
              borderColor: colors.brand.Secondary,
            }}
          />
        )}
        {flag === 'edit' && !finish && (
          <AdvancedButton
            title={translate('PAGE.SALES.CART.FINISH_SALES')}
            onPress={() => ediFinishSales(true)}
            style={{
              ...styles.buttonContainer,
              backgroundColor: colors.brand.Tertiary,
              borderColor: colors.brand.Tertiary,
            }}
          />
        )}

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

export default CartScreen;
