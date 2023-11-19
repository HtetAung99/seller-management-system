import React, { useState } from 'react';
import FloatingBtn from '../../components/floating-btn';
import { View, Text, Modal, Pressable, TextInput } from 'react-native';
import s from './styles';
import Close from '../../components/close-circle';

export default Promotions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={s.container}>
        <View style={s.content}>
          <Text style={s.title}>Title</Text>
          <Text style={{ marginTop: 'auto' }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
      </View>
      <FloatingBtn onPress={() => setModalVisible(true)} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={s.centeredView}>
          <View style={s.modalView}>
            <Close {...{ modalVisible, setModalVisible }} />
            <Text style={styles.modalText}>Create Promotion</Text>
            <TextInput defaultValue="Title" style={s.input} />
            <TextInput
              defaultValue="Description"
              style={[s.input, s.textarea]}
              multiline
            />
            <Pressable
              style={[s.btn, { alignSelf: 'flex-end', marginTop: 10 }]}
              onPress={() => alert('Peace out, bitch!')}>
              <Text style={s['btn-text']}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
