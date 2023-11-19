import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { width } from '../constants';
import C4ELogo from '../dummyPhotos/logo.png';

function Logo() {
  return (
    <View style={styles.img}>
      <Image source={C4ELogo} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: width * 0.5,
    height: width * 0.3,
  },
});

export default Logo = React.memo(Logo);
