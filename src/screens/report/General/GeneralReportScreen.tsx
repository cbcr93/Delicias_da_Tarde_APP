import { Text, View } from 'react-native';
import translate from '@services/i18n';
import { AdvancedButton, AdvancedIcon } from '@components/index';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { redirect } from '@routes/Redirect';
import * as models from '@models/types';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@utils/formatters';

import styles from './styles';
import { CardReport } from '@components/CardReport';

interface Props {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'> & {
    getState(): NavigationState | undefined;
  };
}

const GeneralReportScreen = (props: Props) => {
  const { navigation } = props;

  const exempleItens: {
    id: string;
    amount_total_sales: number;
    price_total_sales: string;
    average_ticket_sales: string;
    amount_total_stoke: number;
    sales: {
      id: string;
      date: Date | string;
      amamount_toal: number;
      price_total: string;
      finish: boolean;
      itens: Partial<models.IProduct>[];
    }[];
  } = {
    id: 'x123',
    amount_total_sales: 75,
    price_total_sales: '3080000',
    average_ticket_sales: '1780',
    amount_total_stoke: 250,
    sales: [
      {
        id: 'x1234',
        date: '2025-05-14 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: false,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x12345',
        date: '2025-05-14 06:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: false,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x12346',
        date: '2025-05-14 08:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x12347',
        date: '2025-05-14 09:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x12348',
        date: '2025-05-13 09:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x12349',
        date: '2025-05-12 09:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1235',
        date: '2025-04-11 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1236',
        date: '2025-04-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1237',
        date: '2025-03-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1238',
        date: '2025-02-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1239',
        date: '2025-01-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1240',
        date: '2024-12-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1241',
        date: '2024-11-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '27000z',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1242',
        date: '2024-10-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: false,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1243',
        date: '2024-09-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1244',
        date: '2024-08-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
      {
        id: 'x1245',
        date: '2024-08-05 12:00:00.00',
        amamount_toal: 9,
        price_total: '2700',
        finish: true,
        itens: [
          {
            id: 'x1',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 300.0,
            amount: 3,
          },
          {
            id: 'x2',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 400.0,
            amount: 4,
          },
          {
            id: 'x3',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
          {
            id: 'x4',
            name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus est laoreet, eleifend mi vitae, posuere urna. Duis eget purus et eros fermentum mattis. Etiam sit amet tortor quis diam placerat tristique varius in odio. Donec sollicitudin dui viverra, mattis libero aliquet, tincidunt massa. Maecenas lacus risus, dignissim ac dignissim eget, consectetur et nunc. Pellentesque accumsan volutpat porta. Mauris tellus ipsum, rutrum vitae quam ac, auctor cursus magna. Cras efficitur a elit a volutpat. Maecenas quis mollis tortor. Sed id vulputate sem.',
            price: 100.0,
            amount: 1,
          },
        ],
      },
    ],
  };

  const detailsItem = (item: {
    id: string;
    date: Date | string;
    amamount_toal: number;
    price_total: string;
    finish: boolean;
    itens: Partial<models.IProduct>[];
  }) => {
    redirect(navigation, { name: 'CartScreen', params: { options: { flag: 'edit', item } } });
  };

  const searchByDate = (when: string) => {
    switch (when) {
      case 'today':
        console.log(Date.now());
        break;

      case 'week':
        break;

      case 'mounth':
        break;

      case 'personalized':
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.search}>
              <AdvancedButton
                title={'Hoje'}
                onPress={() => searchByDate('today')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Semana'}
                onPress={() => searchByDate('week')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Mês'}
                onPress={() => searchByDate('mounth')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
              <Text
                style={{
                  ...styles.title,
                }}
              >
                {'|'}
              </Text>
              <AdvancedButton
                title={'Personalizado'}
                onPress={() => searchByDate('personalized')}
                style={styles.button_Text}
                textColor={styles.button_Text.color}
              />
            </View>

            <View style={styles.header_content}>
              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'shopping-bag', styles.Icon.width, styles.Icon.color)}
                <Text
                  style={styles.sub_title}
                >{`${exempleItens.amount_total_sales} unidade(s)`}</Text>
                <Text style={styles.text}>
                  {translate('PAGE.REPORT.GENERAL.TOTAL_PRODUCTS_SALES')}
                </Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'dollar-sign', styles.Icon.width, styles.Icon.color)}
                <Text style={styles.sub_title}>
                  {formatCurrency(Number(exempleItens.price_total_sales) / 100)}
                </Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.TOTAL_SALES')}</Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'bar-chart-2', styles.Icon.width, styles.Icon.color)}
                <Text style={styles.sub_title}>
                  {formatCurrency(Number(exempleItens.average_ticket_sales) / 100)}
                </Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.TOTAL_SALES')}</Text>
              </View>

              <View style={styles.geral_content}>
                {AdvancedIcon('Feather', 'archive', styles.Icon.width, styles.Icon.color)}
                <Text
                  style={styles.sub_title}
                >{`${exempleItens.amount_total_stoke} unidade(s)`}</Text>
                <Text style={styles.text}>{translate('PAGE.REPORT.GENERAL.TOTAL_STOKE')}</Text>
              </View>
            </View>
          </View>
        }
        data={exempleItens.sales}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => <CardReport item={item} detailsItem={(i) => detailsItem(i)} />}
      />
    </View>
  );
};

export default GeneralReportScreen;
