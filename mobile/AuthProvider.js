import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '261173677790-dova25qtspedtb010qf742m4g95cuhsl.apps.googleusercontent.com',
});

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [vendor, setVendor] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        vendorId,
        setUser,
        setVendorId,
        vendor,
        setVendor,
        googleLogin: async () => {
          try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              return;
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setUser(null);
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
