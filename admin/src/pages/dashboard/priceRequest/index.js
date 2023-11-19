import { compose } from '@reduxjs/toolkit';
import GroupByTable from 'components/groupByTable';
import DataTable from 'pages/dashboard/table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prrLoaded, prrUnmount } from 'redux/slices/firebaseNoti';
import { prrDataChanges, prrDetailChanges } from 'redux/slices/priceRequest';
import PriceRequest from 'services/models/priceRequest';
import { isEmptyObj } from 'utils';
import { getColumns } from './tableData';

const PriceRequestTab = ({ groupByState, searchInput }) => {
  const { prrList, prr } = useSelector((state) => state.prr);
  const { vendors } = useSelector((state) => state.vendors);
  const { role } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  const isVisible = !isEmptyObj(prr);

  const dispatch = useDispatch();

  const columns = getColumns(role);

  useEffect(() => {
    const dispatchPRRChanges = compose(dispatch, prrDataChanges);
    const dispatchPRRLoaded = compose(dispatch, prrLoaded);

    const unsubscribe = PriceRequest.watchPriceRequests(
      dispatchPRRLoaded,
      dispatchPRRChanges,
      vendors,
      categories,
      role
    );

    return () => {
      dispatch(prrUnmount());
      unsubscribe();
    };
  }, [dispatch, vendors, categories, role]);

  const recordHandler = compose(dispatch, prrDetailChanges);

  const processSearch = (tableData) => {
    return tableData.filter((d) => {
      const {
        product: {
          id,
          category_id,
          management_status,
          vendor_id,
          created_at,
          image,
          ...dataObj
        },
      } = d;
      return Object.values(dataObj)
        .join(',')
        .toLowerCase()
        .includes(searchInput);
    });
  };

  const filteredOutColumns = ['category_name', 'vendor_name'];

  const filterColumns = (col) => {
    const f =
      typeof col.dataIndex === 'object'
        ? col.dataIndex.slice(-1)[0]
        : col.dataIndex;
    return filteredOutColumns.indexOf(f) === -1;
  };

  const visibleColumns = isVisible ? columns.filter(filterColumns) : columns;

  return (
    <>
      {groupByState ? (
        <GroupByTable
          tableState="prr"
          columns={visibleColumns}
          groupByState={groupByState}
          data={processSearch(prrList)}
          handleClick={recordHandler}
        />
      ) : (
        <DataTable
          tableState="prr"
          columns={visibleColumns}
          data={processSearch(prrList)}
          handleClick={recordHandler}
        />
      )}
    </>
  );
};

export default PriceRequestTab;
