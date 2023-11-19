import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { AuthContext } from '../../../AuthProvider';
import History from '../../../models/history';
import PriceHistoryCard from './price-card';
import Loader from '../../../components/loader';

export default function PriceTab() {
  const { vendorId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    let isMounted = true;
    setRefreshing(true);
    History.getRecordsForPrr(vendorId).then(result => {
      if (isMounted) {
        setRecords(result);
      }
      setRefreshing(false);
    });

    return () => {
      isMounted = false;
    };
  }, [setRecords, setRefreshing]);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      const result = await History.getRecordsForPrr(vendorId);
      if (isMounted) {
        setRecords(result);
      }
      setLoading(false);
    }

    fetchData();
    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [setLoading, setRecords]);

  if (loading) return <Loader />;

  return (
    <ScrollView
      style={{
        width: '100%',
      }}
      contentContainerStyle={{ alignItems: 'center' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {records.map((record, index) => (
        <PriceHistoryCard key={index} record={record} />
      ))}
    </ScrollView>
  );
}
