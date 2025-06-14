import { FlatList, View } from 'react-native';
import { useState } from 'react';
import { AdvancedButton } from '@components/AdvancedButton';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import { AdvacedInput } from '@components/AdvancedInput';
import { AdvancedIcon } from '@components/AdvancedIcon';
import translate from '@services/i18n';
import { CardProductSale } from '@components/CardProductSale';
import * as models from '@models/types';

import styles from './styles';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const RegisterSalesScreen = (props: Props) => {
  const { navigation } = props;
  const [search, setSearch] = useState('');

  const exempleProduct = [
    {
      id: '1',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'Sem produto',
      code: 'X1',
      amount: 0,
    },
    {
      id: '2',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'Bebidas',
      code: 'X2',
      amount: 100,
    },
    {
      id: '3',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'BomBoms',
      code: 'X3',
      amount: 100,
    },
    {
      id: '4',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'Bolos',
      code: 'X4',
      amount: 100,
    },
    {
      id: '5',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'Bolos',
      code: 'X5',
      amount: 100,
    },
    {
      id: '6',
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
      price: 100.0,
      type: 'Bebidas',
      code: 'X6',
      amount: 100,
    },
  ];

  const addCart = (item: models.IProduct) => {
    console.log(item);
  };

  const toDatails = (item: models.IProduct) => {
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
        <FlatList
          data={exempleProduct}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={({ item }) => (
            <CardProductSale item={item} addCart={addCart} toDatails={toDatails} />
          )}
        />
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
