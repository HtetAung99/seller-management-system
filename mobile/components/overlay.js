import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { DetailType } from '../models/helper';

export const Overlay = ({ size = 65, blur = 0.4, id, noClick }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={[s.overlay, { backgroundColor: `rgba(74, 72, 67, ${blur})` }]}
      {...(!noClick && {
        onPress: () =>
          navigation.navigate('Detail', {
            id: id,
            type: DetailType.pend,
          }),
      })}>
      <Feather name="clock" size={size} color="#fff" />
    </Pressable>
  );
};

const s = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
