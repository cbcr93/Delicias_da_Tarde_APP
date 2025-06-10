import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { formatCurrency } from '@utils/formatters';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { colors } from '@themes/colors';
import { AdvancedButton, CardCartSale } from '@components/index';

import styles from './CartScreenStyles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const CartScreen = (props: Props) => {
  const { navigation } = props;

  const [totalAmount, SetTotalAmount] = useState(0);
  const [totalPrice, SetTotalPrice] = useState(0);

  const exempleItens: Partial<models.IProduct>[] = [
    {
      id: 'x1',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 300.00,
      amount: 3,
    },
    {
      id: 'x2',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 400.00,
      amount: 4,
    },
    {
      id: 'x3',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.00,
      amount: 1,
    },
    {
      id: 'x4',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.00,
      amount: 1,
    },
  ];

  useEffect(() => {
    SetTotalAmount(
      exempleItens.reduce((acc, item) => acc + (item.amount ?? 0), 0)
    );
    SetTotalPrice(
      exempleItens.reduce((acc, item) => acc + ((item.price ?? 0) * (item.amount ?? 0)),
        0
      ));
  }, [exempleItens]);

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

  const addMore = (item: Partial<models.IProduct>) => {
    console.log(item);
  };

  const minusItem = (item: Partial<models.IProduct>) => {
    console.log(item);
  };

  const removeItem = (item: Partial<models.IProduct>) => {
    console.log(item);
  };

  const clearCart = () => {
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exempleItens}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <CardCartSale
            item={item}
            addMore={addMore}
            minusItem={minusItem}
            removeItem={removeItem}
          />

        )}
        ListFooterComponent={() => (
          <View style={styles.footer_flat}>
            <Text style={styles.title}>{translate('PAGE.SALES.CART.RESUME')}</Text>

            <View style={styles.text_content}>
              <Text style={styles.sub_title}>{translate('PAGE.SALES.CART.AMOUNT_TOTAL')}</Text>
              <Text style={styles.text}>{`${totalAmount} unidade(s)`}</Text>
            </View>

            <View style={styles.text_content}>
              <Text style={styles.sub_title}>{translate('PAGE.SALES.CART.PRICE_TOTAL')}</Text>
              <Text style={styles.text}>{formatCurrency(totalPrice)}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>

        <AdvancedButton
          title={translate('PAGE.SALES.CART.CONFIRM')}
          onPress={redirectConfirmCart}
          style={styles.buttonContainer}
          icon="check-circle"
          iconSize={24}
        />

        <AdvancedButton
          title={translate('PAGE.SALES.CART.CLEAR_CART')}
          onPress={clearCart}
          style={styles.buttonContainer}
          icon="trash-2"
          iconSize={24}
          backgroundColor={colors.brand.Quaternary}
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

export default CartScreen;
