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
  const itemDetails = route?.params?.options?.item as CartItemDetails | null | undefined;

  const [totalAmount, SetTotalAmount] = useState(0);
  const [totalPrice, SetTotalPrice] = useState(0);
  const [Itens, SetItens] = useState<Partial<models.ProductsEntities>[]>([]);

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (flag === 'edit' && itemDetails) {
      if (itemDetails.itens) {
        SetItens(itemDetails.itens);
        SetTotalAmount(
          itemDetails.itens.reduce((acc, item) => acc + (Number(item.amount) ?? 0), 0),
        );
        SetTotalPrice(itemDetails.itens.reduce((acc, item) => acc + (Number(item.price) ?? 0), 0));
      } else {
        SetItens([]);
      }
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

  const redirectConfirmCart = () => {
    redirect(navigation, { name: 'ConfirmCartScreen' });
  };

  const finishSales = () => {
    const body = {
      price_total: totalPrice,
      amount_toal: totalAmount,
      finish: true,
      user_id: user?.id,
      sales_item: Itens,
    };

    console.log('body', body);

    // redirect(navigation, { name: 'ConfirmCartScreen' });
  };

  const addMore = (item: models.ProductsEntities) => {
    if (item) {
      try {
        dispatch(cartThunks.addCart(item));
        showToast({
          type: 'success',
          title: 'Item adicionado no carrinho!',
        });
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Erro ao adicionar no carrinho!',
        });
      }
    }
  };

  const removeItem = (item: models.ProductsEntities) => {
    if (item) {
      try {
        dispatch(cartThunks.removeCartById(item));
        showToast({
          type: 'success',
          title: 'Item remover do carrinho!',
        });
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Erro ao remover do carrinho!',
        });
      }
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
                !itemDetails.finish && {
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

        {flag === 'edit' && itemDetails && (
          <>
            {itemDetails.finish && (
              <AdvancedButton
                title={translate('PAGE.SALES.CART.FINISH_SALES_NOT')}
                onPress={redirectConfirmCart}
                style={{
                  ...styles.buttonContainer,
                  backgroundColor: colors.brand.Secondary,
                  borderColor: colors.brand.Secondary,
                }}
              />
            )}

            {!itemDetails.finish && (
              <AdvancedButton
                title={translate('PAGE.SALES.CART.FINISH_SALES')}
                onPress={redirectConfirmCart}
                style={{
                  ...styles.buttonContainer,
                  backgroundColor: colors.brand.Tertiary,
                  borderColor: colors.brand.Tertiary,
                }}
              />
            )}
          </>
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
