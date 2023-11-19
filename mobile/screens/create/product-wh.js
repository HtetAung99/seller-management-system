import React from 'react';
import Wrapper from './children-wrapper';
import { Label } from './text-area';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import s from './styles';

export const ProductWh = ({ warehouses, setWarehouses }) => {
  return (
    <Wrapper>
      <Label label="Warehouse" />
      <View style={s['check-box-ctn']}>
        {warehouses.map((wh, id) => (
          <CheckBox
            key={id}
            title={wh.name}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={wh.checked}
            onPress={() =>
              setWarehouses([
                ...warehouses.map(e =>
                  wh.name === e.name ? { ...wh, checked: !wh.checked } : e,
                ),
              ])
            }
            containerStyle={s.checkbox}
          />
        ))}
      </View>
    </Wrapper>
  );
};
