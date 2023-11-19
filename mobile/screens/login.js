import React from 'react';
import GoogleSignIn from '../components/GoogleSignIn';
import Logo from './logo';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import { height } from '../constants';

export default function LogIn({ navigation }) {
  return (
    <SafeAreaView style={styles.layout}>
      <Logo />
      <View style={styles.google}>
        <GoogleSignIn />
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate('SignUp')}>
          Don't have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    color: 'blue',
    paddingTop: 7,
  },
  google: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: height * 0.05,
    alignItems: 'center',
  },
});
