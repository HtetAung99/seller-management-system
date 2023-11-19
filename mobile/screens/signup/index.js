import React from 'react';
import { Button } from 'react-native';
import { Image, SafeAreaView, View, Text } from 'react-native';
import ContactUs from '../../dummyPhotos/contactus.jpg';
import s from './styles';
import info from '../contact-info';

function SignUp({ navigation }) {
  return (
    <SafeAreaView style={s.layout}>
      <Image source={ContactUs} style={s.photo} />
      <View style={s['contact-us']}>
        <Text style={s.header}>Contact Us</Text>
        <Text style={s['contact-info']}>Phone : {info.phone_number}</Text>
        <Text style={s['contact-info']}>Mail : {info.email}</Text>
      </View>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

export default React.memo(SignUp);
