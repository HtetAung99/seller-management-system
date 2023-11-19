import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { dateformat } from '../../models/helper';
import s from './styles';

export const Status = ({ created_at, detailType }) => {
  const statusConfig = {
    product: {
      color: '#15AC72',
      statusText: `Approved (${dateformat(created_at)})`,
      icon: 'checkcircleo',
    },
    pending: {
      color: '#F77A15',
      statusText: `Pending`,
      icon: 'clockcircleo',
    },
    reject: {
      color: 'red',
      statusText: `Rejected (${dateformat(created_at)})`,
      icon: 'closecircleo',
    },
  };

  return (
    <View style={[s.time, { borderColor: statusConfig[detailType].color }]}>
      <Text
        style={{
          color: statusConfig[detailType].color,
          fontSize: 14,
          marginRight: 4,
        }}>
        {statusConfig[detailType].statusText}
      </Text>
      <Icon
        name={statusConfig[detailType].icon}
        size={19}
        color={statusConfig[detailType].color}
      />
    </View>
  );
};
