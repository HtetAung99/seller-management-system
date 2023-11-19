import { StyleSheet } from 'react-native';
import { height } from '../../constants';

export default styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%',
    borderWidth: 1,
    borderRadius: 8,
    height: height * 0.125,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    borderWidth: 1,
    borderRadius: 7,
    height: height * 0.1,
    width: height * 0.1,
    marginRight: 10,
  },
  'p-info': {
    height: '100%',
    flexDirection: 'column',
    maxWidth: '80%',
    flexGrow: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#434242',
  },
  'price-qty': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'approve-time': {
    fontSize: 11,
    fontWeight: '400',
    color: '#aba9a9',
    marginRight: 'auto',
  },
  'p-name': {
    fontSize: 20,
    fontWeight: '600',
    maxWidth: '90%',
    marginBottom: 6,
    marginTop: 2,
  },
});
