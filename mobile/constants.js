import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const isIos = Platform.OS === 'ios';
const height = Dimensions.get('window').height;

export { width, isIos, height };
