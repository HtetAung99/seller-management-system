import React, { useContext, useEffect, useState } from 'react';
import SearchBar from '../../components/search-bar';
import ProductCard from '../../components/ProductCard';
import FloatingBtn from '../../components/floating-btn';
import { SafeAreaView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Product } from '../../models/product';
import { AuthContext } from '../../AuthProvider';
import { ProductRequest } from '../../models/productRequest';
import { width } from '../../constants';
import messaging from '@react-native-firebase/messaging';
import { showToast } from '../../utils';
import { CloudMessagaing } from '../../models/cloudMessaging';
import { DetailType, HistoryTabIndex } from '../../models/helper';

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { vendorId } = useContext(AuthContext);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      const notiData = remoteMessage.data;
      if (notiData.status === 'reject') {
        navigation.navigate('History', {
          tabIndex: HistoryTabIndex[notiData.type],
        });
      }
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      await CloudMessagaing.requestUserPermission(vendorId);
    };
    init();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notiData = remoteMessage.data;
      if (notiData.status === 'approve') {
        showToast({
          type: 'success',
          title: `Your ${notiData.type} request is approved`,
          body: `${notiData.name} - ${notiData.price} Ks`,
          onPress: () => {
            navigation.navigate('Detail', {
              id: notiData.product_id,
              type: DetailType.prod,
            });
          },
        });
      } else {
        showToast({
          type: 'error',
          title: `Your ${notiData.type} request is rejected`,
          body: `${notiData.name} - ${notiData.price} Ks`,
          onPress: () =>
            navigation.navigate('History', {
              tabIndex: HistoryTabIndex[notiData.type],
            }),
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = Product.watchProducts(setProducts, vendorId);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = ProductRequest.watchPending(setPending, vendorId);
    return () => unsubscribe();
  }, []);

  const preprocess = data => {
    return data.filter(d => {
      const {
        id,
        category_id,
        management_status,
        vendor_id,
        created_at,
        image,
        ...dataObj
      } = d;
      return Object.values(dataObj)
        .join(',')
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        setSearchInput={setSearchInput}
        pendingLength={pending.length}
        pendingHandle={() =>
          pending.length > 0 && navigation.navigate('Pending')
        }
      />
      <FlatGrid
        data={preprocess(products)}
        itemDimension={(width - 50) / 2}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <FloatingBtn onPress={() => navigation.navigate('Create')} />
    </SafeAreaView>
  );
}
