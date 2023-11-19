import React from 'react';
import { TextInput, Text } from 'react-native';
import Wrapper from './children-wrapper';
import { Label } from './text-area';
import s from './styles';

export const ProductName = ({ touched, errors, handleBlur, handleChange }) => {
  return (
    <Wrapper>
      <Label label="Name" />
      <TextInput
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        style={s.input}
      />
      {touched.name && errors.name ? (
        <Text style={s.error}>{errors.name}</Text>
      ) : null}
    </Wrapper>
  );
};
