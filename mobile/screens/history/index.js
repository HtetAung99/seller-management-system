import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import s from './styles';
import { TabControl } from '../detail/control-tab';
import ProductTab from './product-tab';
import PriceTab from './price-tab';

export default function HistoryScreen({ route }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (route.params?.tabIndex) {
      setIndex(route.params.tabIndex);
    } else {
      setIndex(0);
    }
  }, [setIndex, route.params?.tabIndex]);

  const handleIndexChange = index => setIndex(index);

  return (
    <SafeAreaView style={s.layout}>
      <TabControl {...{ index, handleIndexChange, isHistory: true }} />
      {index === 0 ? <ProductTab /> : <PriceTab />}
    </SafeAreaView>
  );
}
