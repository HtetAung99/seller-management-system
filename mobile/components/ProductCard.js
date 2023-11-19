import React from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DetailType } from '../models/helper';
import { width } from '../constants';

function ProductCard({ product }) {
  const { image_url, name, price } = product;
  const navigation = useNavigation();

  return (
    <View
      style={Platform.OS === 'android' ? styles.android : styles['grid-item']}>
      <Pressable
        onPress={() =>
          navigation.navigate('Detail', {
            id: product.id,
            type: DetailType.prod,
          })
        }>
        <View style={Platform.OS === 'android' && styles['android-specific']}>
          <Image style={styles['p-photo']} source={{ uri: image_url }} />
          <Text style={styles['p-name']} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.price}>{price} Ks</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  'grid-item': {
    flexDirection: 'column',
    borderColor: '#454242',
    borderRadius: 10,
    borderWidth: 0.2,
    padding: 10,
    backgroundColor: '#efefef',
    overflow: 'hidden',
    flex: 1,
  },
  android: {
    flexDirection: 'column',
    borderColor: '#454242',
    backgroundColor: '#efefef',
    borderRadius: 5,
    borderWidth: 0.25,
    flex: 1,
  },
  'android-specific': {
    flexDirection: 'column',
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 8,
  },
  'p-photo': {
    width: '100%',
    height: width * 0.4,
    borderRadius: 10,
  },
  'p-name': {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    fontWeight: '300',
  },
});

export default ProductCard;
