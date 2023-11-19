import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { dateformat } from '../../../models/helper';

const PriceHistoryCard = ({ record }) => {
  const config = {
    approve: {
      statusText: 'Approved',
      color: '#15ec72',
    },
    reject: {
      statusText: 'Rejected',
      color: 'red',
    },
  };
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {record.product_name}
      </Text>
      <Text style={styles.price}>
        {record.previous_price} Ks &gt;&gt; {record.price_requested} Ks
      </Text>
      <Text
        style={{
          color: config[record.status].color,
          fontSize: 13,
        }}>
        {config[record.status].statusText} ({dateformat(record.created_at)})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    width: '93%',
    padding: 10,
    marginBottom: 15,
  },
  price: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 17,
    marginBottom: 8,
    fontWeight: '600',
  },
});

export default PriceHistoryCard;
