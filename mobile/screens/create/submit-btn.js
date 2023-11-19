import React from 'react';
import s from './styles';
import { Pressable, Text } from 'react-native';

export const SubmitBtn = ({ disabled, handleSubmit }) => {
  return (
    <Pressable disabled={disabled} style={s.btn} onPress={handleSubmit}>
      <Text style={s.submit}>Submit</Text>
    </Pressable>
  );
};
