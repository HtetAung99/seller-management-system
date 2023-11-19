import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Loading ...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
