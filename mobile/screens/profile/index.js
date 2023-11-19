import React, { useContext } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { AuthContext } from '../../AuthProvider';
import { DataBox } from './data-box';
import { Avatar } from 'react-native-elements';
import s from './styles';

const colors = ['red', 'orangered', 'green', '#FFC75F', '#004AB5', '#007EBA'];

const getColor = colors[Math.floor(Math.random() * colors.length)];

export default function Profile() {
  const {
    logout,
    vendor: { owner, email, name, phone, address },
  } = useContext(AuthContext);

  const getTitle = () => owner.split(' ').reduce((x, y) => x[0] + y[0]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={s.layout}>
        <View style={s['user-pic']}>
          <Avatar
            size="xlarge"
            title={getTitle()}
            titleStyle={{ color: getColor }}
            activeOpacity={1}
          />
          <View style={s.active}>
            <Text>&nbsp;</Text>
          </View>
        </View>
        <Text style={s.name}>{owner}</Text>
        <Text style={s.mail}>{email}</Text>
        <DataBox label="Shop Name" data={name} />
        <DataBox label="Phone" data={phone} />
        <DataBox label="Address" data={address} />
        <Pressable style={s.button} onPress={logout}>
          <Text style={s.logout}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
