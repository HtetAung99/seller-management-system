import { StyleSheet } from 'react-native';
import { height, width } from '../../constants';

export default styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'contact-us': {
    width: '90%',
    padding: width * 0.05,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: height * 0.01,
  },
  'contact-info': {
    fontSize: 18,
    color: '#454242',
    marginVertical: 6,
  },
  photo: {
    height: height * 0.4,
    width: height * 0.4,
  },
});
