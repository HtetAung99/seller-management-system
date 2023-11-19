import { ActivityIndicator } from 'react-native';
import React from 'react';

const Loader = () => (
  <ActivityIndicator
    style={{
      flex: 1,
    }}
    size="large"
  />
);

export default Loader;
