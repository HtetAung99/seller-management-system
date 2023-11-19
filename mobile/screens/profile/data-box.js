import React from 'react';
import s from './styles';
import { View, Text } from 'react-native';

export const DataBox = ({ label, data }) => {
  return (
    <View style={s.dataBox}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.data}>{data}</Text>
    </View>
  );
};
