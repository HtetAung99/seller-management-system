import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const showToast = ({ title, body, type, onPress }) => {
  Toast.show({
    type,
    text1: title,
    text2: body,
    position: 'bottom',
    onPress,
  });
};
