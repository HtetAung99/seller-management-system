import { isIos, width, height } from '../../constants';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    height: height * 0.12,
    width: '95%',
    borderWidth: 1,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
  input: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: '100%',
    marginTop: 4,
    textAlignVertical: 'top',
  },
  textarea: {
    height: height * 0.125,
  },
  mmk: {
    fontSize: 18,
    paddingRight: 4,
  },
  close: {
    textAlign: 'right',
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
  'btn-text': {
    fontSize: 18,
    color: '#fff',
  },
  btn: {
    backgroundColor: '#434242',
    borderRadius: 8,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
