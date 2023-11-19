import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';

export const ProductInfo = ({ name, original_barcode }) => {
  return (
    <View style={s['p-info']}>
      <Text style={s['p-name']}>{name}</Text>
      <View style={s['price-qty']}>
        <Text style={s['p-barcode']}>{original_barcode}</Text>
      </View>
    </View>
  );
};
