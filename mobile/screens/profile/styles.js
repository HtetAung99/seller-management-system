import { StyleSheet } from 'react-native';
import { height, width } from '../../constants';

export default styles = StyleSheet.create({
  layout: {
    padding: 20,
    alignItems: 'center',
  },
  'user-pic': {
    position: 'relative',
    marginTop: 10,
    borderRadius: 15,
    width: width * 0.4,
    height: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEFDF',
  },
  active: {
    position: 'absolute',
    bottom: -(height * 0.01),
    right: -(height * 0.01),
    width: height * 0.03,
    height: height * 0.03,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'transparent',
    borderRadius: (height * 0.03) / 2,
    backgroundColor: '#00FF6C',
    elevation: 8,
    shadowColor: '#00FF58',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  name: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  mail: {
    marginTop: 10,
    marginBottom: 20,
    color: '#aba9a9',
    fontSize: 13,
    fontWeight: '500',
  },
  dataBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'column',
    padding: 10,
    marginBottom: 15,
  },
  label: {
    color: '#aba9a9',
    fontSize: 11,
    fontWeight: '500',
  },
  data: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#454242',
    borderRadius: 8,
    borderWidth: 0,
    width: '100%',
    marginTop: height * 0.18,
  },
  logout: {
    color: '#DFDEDE',
    fontSize: 18,
    fontWeight: '700',
    padding: 12,
  },
});
