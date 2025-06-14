import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState, RouteProp, useRoute } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { useEffect, useState } from 'react';
import { AdvacedInput } from '@components/AdvancedInput';
import { formatCurrency } from '@utils/formatters';
import * as productsThunks from '@redux/product/thunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';

import styles from './styles';
interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const AddOrEditProductScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigation } = props;
  const route = useRoute<RouteProp<ReactNavigation.RootParamList, 'ProductDetailsScreen'>>();
  const flag = route?.params?.options?.flag;
  const item: models.ProductsEntities | null | undefined = route?.params?.options?.item;
  const [name, setName] = useState('');

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('R$ 0,00');
  const [amount, setAmount] = useState('0');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [disableAdd, setDisableAdd] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);

  const redirectBackOrHome = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      redirect(navigation, { name: 'Home' });
    }
  };

  const handleAdd = () => {
    const body: models.IProductsCreate = {
      name,
      description,
      price: price.replace(/\D/g, ''),
      amount: amount.replace(/\D/g, '').replace(/^0+/, ''),
      type,
      code,
    };

    dispatch(productsThunks.addProduct(body));

    redirectBackOrHome();
  };

  const handleEdit = () => {
    const body = {
      name: name.trim(),
      description: description.trim(),
      price: price.replace(/\D/g, ''),
      amount: amount.replace(/\D/g, '').replace(/^0+/, ''),
      type: type.trim(),
      code: code.trim(),
    };

    if (item?.id) dispatch(productsThunks.editProduct({ id: item.id, ...body }));

    redirectBackOrHome();
  };

  const disableValid = () => {
    if (flag === 'add') {
      if (
        name.trim().length > 2 &&
        description.trim().length > 2 &&
        type.trim().length > 2 &&
        code.trim().length > 2
      ) {
        setDisableAdd(false);
      } else {
        setDisableAdd(true);
      }
    }

    if (flag === 'edit' && item) {
      if (
        (name !== item.name ||
          description !== item.description ||
          price.replace(/\D/g, '') !== item.price.toString().replace(/\D/g, '') ||
          amount.replace(/\D/g, '').replace(/^0+/, '') !==
          item.amount.toString().replace(/\D/g, '').replace(/^0+/, '') ||
          type !== item.type ||
          code !== item.code) &&
        name.trim().length > 2 &&
        description.trim().length > 2 &&
        type.trim().length > 2 &&
        code.trim().length > 1
      ) {
        setDisableEdit(false);
      } else {
        setDisableEdit(true);
      }
    }
  };

  const chageValue = (value: string, key: string) => {
    switch (key) {
      case 'name':
        // eslint-disable-next-line
        const sanitizedName = value.replace(/\s{2,}/g, ' ');
        setName(sanitizedName);
        break;
      case 'description':
        // eslint-disable-next-line
        const sanitizedDescription = value.replace(/\s{2,}/g, ' ');
        setDescription(sanitizedDescription);
        break;
      case 'price':
        // eslint-disable-next-line
        const onlyDigits = value.replace(/\D/g, '');
        // eslint-disable-next-line
        const numericValue = parseInt(onlyDigits || '0', 10);
        // eslint-disable-next-line
        const floatValue = numericValue / 100;
        // eslint-disable-next-line
        const formatValue = formatCurrency(Number(floatValue));
        setPrice(formatValue);
        break;
      case 'amount':
        // eslint-disable-next-line
        const onlyNumbers = value.replace(/\D/g, '').replace(/^0+/, '');
        setAmount(Number(onlyNumbers) > 0 ? onlyNumbers : '0');
        break;
      case 'type':
        // eslint-disable-next-line
        const sanitizedType = value.replace(/\s{2,}/g, ' ');
        setType(sanitizedType);
        break;
      case 'code':
        // eslint-disable-next-line
        const sanitizedCode = value.trim();
        setCode(sanitizedCode);
        break;
      default:
        break;
    }
    disableValid();
  };

  useEffect(() => {
    if (flag === 'edit' && item) {
      chageValue(item.name, 'name');
      chageValue(item.description, 'description');
      chageValue(item.price.toString(), 'price');
      chageValue(item.amount.toString(), 'amount');
      chageValue(item.type, 'type');
      chageValue(item.code, 'code');
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, outlineOffset: 50 }}
      keyboardVerticalOffset={95} // Ajuste conforme seu layout
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.NAME')}</Text>
          <AdvacedInput
            value={name}
            onChangeText={(t) => chageValue(t, 'name')}
            autoCapitalize="none"
            viewStyle={styles.input}
          />

          <Text style={styles.title}>
            {translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.DESCRIPTION')}
          </Text>
          <AdvacedInput
            value={description}
            onChangeText={(t) => chageValue(t, 'description')}
            autoCapitalize="none"
            viewStyle={styles.input}
            editable
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.input_big}
          />

          <Text style={styles.title}>
            {translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.PRICE')}
          </Text>
          <AdvacedInput
            value={price}
            onChangeText={(t) => chageValue(t, 'price')}
            autoCapitalize="none"
            keyboardType="decimal-pad"
            viewStyle={styles.input}
          />

          <Text style={styles.title}>
            {translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.AMOUNT')}
          </Text>
          <AdvacedInput
            value={amount}
            onChangeText={(t) => chageValue(t, 'amount')}
            keyboardType="number-pad"
            autoCapitalize="none"
            viewStyle={styles.input}
          />

          <Text style={styles.title}>{translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.TYPE')}</Text>
          <AdvacedInput
            value={type}
            onChangeText={(t) => chageValue(t, 'type')}
            autoCapitalize="none"
            viewStyle={styles.input}
          />

          <Text style={styles.title}>{translate('PAGE.PRODUCT.ADD_OR_EDIT_SCREEN.FORM.CODE')}</Text>
          <AdvacedInput
            value={code}
            onChangeText={(t) => chageValue(t, 'code')}
            autoCapitalize="none"
            viewStyle={styles.input}
          />
        </View>

        <View style={styles.footer}>
          {flag === 'add' && (
            <AdvancedButton
              title={translate('SHARED.SAVE')}
              onPress={handleAdd}
              style={styles.buttonContainer}
              disabled={disableAdd}
            />
          )}

          {flag === 'edit' && (
            <AdvancedButton
              title={translate('SHARED.EDIT')}
              onPress={handleEdit}
              style={styles.buttonContainer}
              disabled={disableEdit}
            />
          )}

          <AdvancedButton
            title={translate('SHARED.BACK')}
            onPress={redirectBackOrHome}
            style={styles.button_Text}
            textColor={styles.button_Text.color}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddOrEditProductScreen;
