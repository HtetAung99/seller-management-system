import { compose } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promoLoaded, promoUnmount } from 'redux/slices/firebaseNoti';
import { promoDataChanges } from 'redux/slices/promotion';
import Promotion from 'services/models/promotion';
import DataTable from '../table';
import { columns } from './tableData';

const PromotionsTab = () => {
  const { promoList } = useSelector((state) => state.promo);
  const { vendors } = useSelector((state) => state.vendors);

  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchPROMOLoaded = compose(dispatch, promoLoaded);
    const dispatchPROMOChanges = compose(dispatch, promoDataChanges);

    const unsubscribe = Promotion.watchPromotions(
      dispatchPROMOLoaded,
      dispatchPROMOChanges,
      vendors
    );

    return () => {
      dispatch(promoUnmount());
      unsubscribe();
    };
  }, [dispatch, vendors]);
  return (
    <>
      <DataTable
        tableState="promo"
        columns={columns}
        data={promoList}
        handleClick={() => {}}
      />
    </>
  );
};

export default PromotionsTab;
