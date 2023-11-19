import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width } from '../constants';

const FloatingBtn = ({ onPress }) => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles['floating-btn']} onPress={onPress}>
      <Icon name="plus" color="#fff" size={32} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  'floating-btn': {
    backgroundColor: '#454242',
    position: 'absolute',
    bottom: width * 0.06,
    right: width * 0.05,
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (width * 0.18) / 2,
  },
});

export default FloatingBtn;
