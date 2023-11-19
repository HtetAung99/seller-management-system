import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { dateformat, DetailType } from '../../../models/helper';
import s from '../styles';

const ProductHistoryCard = ({ record }) => {
  const navigation = useNavigation();
  const config = {
    approve: {
      statusText: 'Approved',
      icon: 'checkcircleo',
      color: '#15ec72',
    },
    reject: {
      statusText: 'Rejected',
      icon: 'closecircleo',
      color: 'red',
    },
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Detail', {
          id: record.status === 'approve' ? record.product_id : record.trash_id,
          type:
            record.status === 'approve' ? DetailType.prod : DetailType.reject,
        });
      }}
      style={s.card}
      key={record.id}>
      <Image style={s.image} source={{ uri: record.image }} />
      <View style={s['p-info']}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={s['p-name']}>
          {record.product_name}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}>
          <Text style={s.text}>{record.price} Ks</Text>
          <View style={[s['price-qty'], { marginBottom: 2 }]}>
            <Text style={s['approve-time']}>
              {config[record.status].statusText} (
              {dateformat(record.created_at)})
            </Text>
            <Icon
              name={config[record.status].icon}
              size={20}
              color={config[record.status].color}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductHistoryCard;
