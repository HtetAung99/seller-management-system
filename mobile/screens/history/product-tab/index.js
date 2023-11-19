import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { AuthContext } from '../../../AuthProvider';
import Loader from '../../../components/loader';
import History from '../../../models/history';
import ProductHistoryCard from './history-card';

export default function ProductTab() {
  const { vendorId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    let isMounted = true;
    setRefreshing(true);
    History.getRecordsForPdr(vendorId).then(result => {
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
      const result = await History.getRecordsForPdr(vendorId);
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
  }, []);

  if (loading) return <Loader />;

  return (
    <ScrollView
      style={{
        width: '100%',
      }}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {records.map((record, index) => (
        <ProductHistoryCard key={index} record={record} />
      ))}
    </ScrollView>
  );
}
