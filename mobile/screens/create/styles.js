import { StyleSheet } from 'react-native';
import { width, height } from '../../constants';

export default styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 15,
  },
  error: {
    color: 'red',
  },
  photo: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 13,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.025,
    marginTop: 20,
  },
  'edit-photo': {
    position: 'absolute',
    borderTopLeftRadius: 13,
    bottom: 18,
    color: 'white',
    right: -2,
    paddingTop: 6,
    paddingBottom: 9,
    paddingHorizontal: 9,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  camera: {
    width: width * 0.5,
    height: width * 0.5,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 13,
    borderColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.025,
    marginTop: 20,
  },
  upload: {
    fontWeight: '600',
    fontSize: 13,
    color: '#000',
    marginTop: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    paddingLeft: 2,
  },
  price: {
    flexDirection: 'row',
  },
  child: {
    flex: 1,
    marginRight: 6,
  },
  childInput: {
    width: '100%',
    height: height * 0.05,
    justifyContent: 'center',
  },
  'input-area': {
    width: '100%',
    height: height * 0.15,
    textAlignVertical: 'top',
  },
  'check-box-ctn': {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    flexShrink: 1,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#454242',
    borderRadius: 8,
    borderWidth: 0,
    width: '100%',
  },
  submit: {
    color: '#DFDEDE',
    fontSize: 18,
    fontWeight: '700',
    padding: 18,
  },
  input: {
    borderColor: '#b6b6b6',
    borderWidth: 2,
    borderRadius: 5,
    padding: height * 0.012,
    paddingLeft: 12,
  },
});
