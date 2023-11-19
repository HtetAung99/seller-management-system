import React from 'react';
import { View, Text } from 'react-native';
import s from './styles';

const Warehouses = ({ product }) => (
  <View style={s['wh-wrapper']}>
    {product.warehouse_info
      ?.split(',')
      .filter(Boolean)
      .map((name, id) => (
        <View style={s.warehouse} key={id}>
          <Text style={s['wh-name']}>{name}</Text>
        </View>
      ))}
  </View>
);

export default Warehouses;
