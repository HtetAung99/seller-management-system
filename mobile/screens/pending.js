import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { AuthContext } from '../AuthProvider';
import PendingCard from '../components/PendingCard';
import { width } from '../constants';
import { ProductRequest } from '../models/productRequest';

export default function Pending({ navigation }) {
  const [pending, setPending] = useState([]);
  const { vendorId } = useContext(AuthContext);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        navigation.navigate('Home');
      }),
    [navigation],
  );

  useEffect(() => {
    const unsubscribe = ProductRequest.watchPending(setPending, vendorId);
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatGrid
        data={pending}
        itemDimension={(width - 50) / 2}
        renderItem={({ item }) => {
          return <PendingCard productRequest={item} />;
        }}
      />
    </View>
  );
}
