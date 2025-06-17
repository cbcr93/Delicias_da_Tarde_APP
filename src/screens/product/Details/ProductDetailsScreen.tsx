import { Alert, ScrollView, Text, View } from 'react-native';
import { NavigationProp, NavigationState, RouteProp, useRoute } from '@react-navigation/native';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/AdvancedButton';
import { redirect } from '@routes/Redirect';
import { formatCurrency } from '@utils/formatters';
import * as models from '@models/types';
import { useEffect, useState } from 'react';
import * as cartThunks from '@redux/cart/thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';

import styles from './styles';
import { showToast } from '@utils/toast';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const ProductDetailsScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const [disabled, setDisabled] = useState(false);

  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'ProductDetailsScreen'>>();
  const flag = route?.params?.options?.flag;
  const item: models.ProductsEntities | null | undefined = route?.params?.options?.item;

  const redirectBackOrHome = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      redirect(navigation, { name: 'RegisterScreen' });
    }
  };

  const redirectEdit = () => {
    redirect(navigation, {
      name: 'AddOrEditProductScreen',
      params: {
        options: {
          flag: 'edit',
          item,
        },
      },
    });
  };

  const addCart = () => {
    if (item) {
      dispatch(cartThunks.addCart(item));
    }
  };

  useEffect(() => {
    if (item) {
      if (Number(item.amount) === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [item]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.NAME')}</Text>
          </View>
          <Text style={styles.text}>{item?.name ? item.name : 'indefinido'}</Text>

          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.DESCRIPTION')}</Text>
          </View>
          <Text style={styles.text}>{item?.description ? item.description : 'indefinido'}</Text>

          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.PRICE')}</Text>
          </View>
          <Text style={styles.text}>
            {item?.price ? formatCurrency(Number(item.price) / 100) : 'indefinido'}
          </Text>

          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.TYPE')}</Text>
          </View>
          <Text style={styles.text}>{item?.type ? item.type : 'indefinido'}</Text>

          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.AMOUNT')}</Text>
          </View>
          <Text style={styles.text}>
            {item?.amount ? `${item.amount} unidades` : 'Zero unidades'}
          </Text>

          <View style={styles.text_content}>
            <Text style={styles.title}>{translate('PAGE.SALES.DETAILS.CODE')}</Text>
          </View>
          <Text style={styles.text}>{item?.code ? item.code : 'indefinido'}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {flag === 'add' && (
          <AdvancedButton
            title={'Adicionar no carrinho'}
            onPress={addCart}
            style={styles.buttonContainer}
            icon="shopping-cart"
            iconSize={24}
            disabled={disabled}
          />
        )}
        {flag === 'edit' && (
          <AdvancedButton
            title={'Editar Produto'}
            onPress={redirectEdit}
            style={styles.buttonContainer}
          />
        )}
        <AdvancedButton
          title={'voltar'}
          onPress={redirectBackOrHome}
          style={styles.button_Text}
          textColor={styles.button_Text.color}
        />
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
