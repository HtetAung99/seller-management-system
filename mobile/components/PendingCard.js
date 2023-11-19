import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { height, width } from '../constants';
import { Overlay } from './overlay';

function PendingCard({ productRequest: { id, product, image_url } }) {
  return (
    <>
      <Overlay {...{ id }} />
      <View style={styles.gridItem}>
        <Image
          style={styles['p-img']}
          source={{
            uri: image_url,
          }}
        />
        <View style={styles.productCaption}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: height * 0.005,
            }}>
            <Text style={styles.priceText}>{product.price} Ks</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flexDirection: 'column',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  'p-img': {
    width: '100%',
    height: width * 0.4,
    borderRadius: 10,
  },
  productCaption: {
    width: '100%',
    marginTop: height * 0.01,
    marginLeft: width * 0.01,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '300',
  },
  qtyText: {
    color: '#959494',
    fontSize: 13,
  },
});

export default PendingCard;
