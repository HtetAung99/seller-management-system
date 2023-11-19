import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const CustomToast = () => {
  // const navigation = useNavigation();

  /**@type {import('react-native-toast-message').ToastConfig} */
  const config = {
    success: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', marginBottom: 18 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red', marginBottom: 18 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 14,
        }}
      />
    ),
  };

  return <Toast config={config} />;
};

export default CustomToast;
