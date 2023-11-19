import { Button, Text } from 'react-native';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function ContactUs({ logout }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text>You are not a partner yet.</Text>
      <Text>Contact us: {info.phone_number}</Text>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
}

export default memo(ContactUs);
