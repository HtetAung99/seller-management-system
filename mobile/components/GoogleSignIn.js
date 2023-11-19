import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../AuthProvider';
import { width } from '../constants';

function GoogleSignIn() {
  const { googleLogin } = useContext(AuthContext);

  return (
    <GoogleSigninButton
      style={styles.googleBtn}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleLogin}
    />
  );
}

const styles = StyleSheet.create({
  googleBtn: {
    alignItems: 'center',
    width: width * 0.5,
  },
});

export default GoogleSignIn;
