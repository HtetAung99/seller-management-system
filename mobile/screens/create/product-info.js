import React from 'react';
import Wrapper from './children-wrapper';
import s from './styles';
import { Label } from './text-area';
import { View, TextInput, Text } from 'react-native';

export const ProductInfo = ({ touched, errors, handleBlur, handleChange }) => {
  return (
    <Wrapper style={s.price}>
      <View style={s.child}>
        <Label label="Price" />
        <TextInput
          keyboardType="numeric"
          onChangeText={handleChange('price')}
          handleBlur={handleBlur('price')}
          style={s.input}
        />
        {touched.price && errors.price ? (
          <Text style={s.error}>Invalid price</Text>
        ) : null}
      </View>
      <View style={s.child}>
        <Label label="SRP Price" />
        <TextInput
          keyboardType="numeric"
          onChangeText={handleChange('srp_price')}
          handleBlur={handleBlur('srp_price')}
          style={s.input}
        />
        {touched.srp_price && errors.srp_price ? (
          <Text style={s.error}>Invalid SRP</Text>
        ) : null}
      </View>
      <View style={s.child}>
        <Label label="Barcode" />
        <TextInput
          placeholder="optional"
          onChangeText={handleChange('original_barcode')}
          handleBlur={handleBlur('original_barcode')}
          style={s.input}
        />
      </View>
    </Wrapper>
  );
};
