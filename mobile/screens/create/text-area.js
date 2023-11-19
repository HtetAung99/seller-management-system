import React from 'react';
import { Text, TextInput } from 'react-native';
import Wrapper from './children-wrapper';
import s from './styles';

export default TextArea = ({ title, onBlur, onChange }) => {
  return (
    <Wrapper>
      <Label label={title} />
      <TextInput
        placeholder="optional"
        handleBlur={onBlur}
        onChangeText={onChange}
        multiline
        style={[s['input-area'], s.input]}
      />
    </Wrapper>
  );
};

export const Label = ({ label }) => <Text style={s.label}>{label}</Text>;
