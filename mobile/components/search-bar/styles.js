import { StyleSheet } from 'react-native';
import { height } from '../../constants';

export default styles = StyleSheet.create({
  layout: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.055,
    marginVertical: 8,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    flexGrow: 1,
  },
  search: {
    marginRight: 'auto',
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#ccc',
    flexGrow: 0.9,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
  },
  pending: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    height: '100%',
    flexGrow: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    position: 'relative',
  },
  badge: {
    backgroundColor: '#f77a10',
    paddingHorizontal: 5,
    borderRadius: 7,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  'badge-no': {
    color: 'white',
  },
});
