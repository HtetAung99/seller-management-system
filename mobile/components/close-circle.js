import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Pressable } from 'react-native';

export default Close = ({ setModalVisible, modalVisible, reset }) => (
  <Pressable
    onPress={() => {
      setModalVisible(!modalVisible);
      reset && reset();
    }}>
    <Icon name="closecircleo" size={22} style={{ textAlign: 'right' }} />
  </Pressable>
);
