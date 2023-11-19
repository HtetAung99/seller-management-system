import React from 'react';
import s from './styles';
import { isIos, width } from '../../constants';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import Close from '../../components/close-circle';

export const ModalContent = ({
  modalVisible,
  setModalVisible,
  reset,
  setFieldValue,
  priceInput,
  errorPrice,
  handleSubmit,
  dirty,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        reset();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Close {...{ setModalVisible, modalVisible, reset }} />
          <Text style={styles.modalText}>Edit Price</Text>
          <Text style={styles.description}>
            You can update your product's price and wait for approval
          </Text>
          <View style={styles.input}>
            <TextInput
              value={String(priceInput)}
              style={{ width: '70%' }}
              onChangeText={p => setFieldValue('priceInput', p)}
              keyboardType="numeric"
            />
            <Text style={styles.mmk}>Ks</Text>
          </View>
          {errorPrice && <Text style={styles['err-text']}>{errorPrice}</Text>}
          <Pressable
            disabled={!dirty}
            style={[
              s.btn,
              { alignSelf: 'flex-end', marginTop: 20 },
              { backgroundColor: !dirty ? '#ccc' : '#434242' },
            ]}
            onPress={handleSubmit}>
            <Text style={s['btn-text']}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#EFEFEF',
    padding: isIos ? 10 : 0,
    borderRadius: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  mmk: {
    fontSize: 18,
    paddingRight: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: width * 0.9,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '500',
  },
  description: {
    color: '#c4c4c4',
    marginBottom: 20,
    fontSize: 15,
  },
  'err-text': {
    color: 'red',
    paddingTop: 4,
  },
});
