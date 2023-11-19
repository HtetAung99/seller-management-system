import { compose } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pdrLoaded, pdrUnmount } from 'redux/slices/firebaseNoti';
import {
  pdrDataChanges,
  pdrDetailChanges,
  pdrUserActionUpdate,
} from 'redux/slices/productRequest';
import ProductRequest from 'services/models/productRequest';
import { isEmptyObj } from 'utils';
import DataTable from 'pages/dashboard/table';
import { getColumns } from './tableData';
import GroupByTable from 'components/groupByTable';

const ProductRequestTab = ({ groupByState, searchInput }) => {
  const { pdrList, pdr } = useSelector((state) => state.pdr);
  const { vendors } = useSelector((state) => state.vendors);
  const { role } = useSelector((state) => state.auth);
  const isVisible = !isEmptyObj(pdr);

  const columns = getColumns(role);

  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchPDRLoaded = compose(dispatch, pdrLoaded);
    const dispatchPDRChanges = compose(dispatch, pdrDataChanges);

    const dispatchNullifyUserAction = () => dispatch(pdrUserActionUpdate(null));

    const unsubscribe = ProductRequest.watchProductRequests(
      dispatchPDRLoaded,
      dispatchPDRChanges,
      vendors,
      role,
      dispatchNullifyUserAction
    );

    return () => {
      dispatch(pdrUnmount());
      unsubscribe();
    };
  }, [dispatch, vendors, role]);

  const recordHandler = compose(dispatch, pdrDetailChanges);

  const processSearch = (tableData) => {
    return tableData.filter((d) => {
      const {
        product: { image, ...dataObj },
      } = d;
      return Object.values(dataObj)
        .join(',')
        .toLowerCase()
        .includes(searchInput);
    });
  };

  const filteredOutColumns = ['vendor_name', 'srp_price', 'warehouse_info'];

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
          tableState="pdr"
          columns={visibleColumns}
          groupByState={groupByState}
          data={processSearch(pdrList)}
          handleClick={recordHandler}
        />
      ) : (
        <DataTable
          tableState="pdr"
          columns={visibleColumns}
          data={processSearch(pdrList)}
          handleClick={recordHandler}
        />
      )}
    </>
  );
};

export default ProductRequestTab;
