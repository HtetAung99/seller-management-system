import { SafeAreaView, Text, Button } from 'react-native';
import React, { memo } from 'react';
import info from './contact-info';

function Blocked({ logout }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text>You have been blocked.</Text>
      <Text>Contact us: {info.phone_number}</Text>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
}

export default memo(Blocked);
