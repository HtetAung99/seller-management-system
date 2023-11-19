import { compose } from '@reduxjs/toolkit';
import Header from 'components/header';
import SearchBar from 'components/search-bar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  reportDeleteModalToggle,
  trashDetailChanges,
  trashRowSelected,
} from 'redux/slices/trash';
import TrashAction from 'redux/thunks/trashAction';
import { isEmptyObj, showError } from 'utils';
import Drawer from 'components/drawer';
import ReportTable from './table';
import Spinner from 'components/spin';
import ReportDeleteModal from './modal/delete';

function ReportsPage() {
  const { trashs, trash, status } = useSelector((state) => state.trashs);

  const isVisible = !isEmptyObj(trash);

  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrashs = async () => {
      try {
        await dispatch(TrashAction.fetchTrashs()).unwrap();
      } catch (e) {
        console.log(e);
        showError("Can't fetch reports");
      }
    };

    fetchTrashs();

    return () => {
      closeHandler();
    };
  }, [dispatch]);

  const preprocess = (tableData) => {
    return tableData.filter((d) => {
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
        .includes(searchInput);
    });
  };

  const recordHandler = compose(dispatch, trashDetailChanges);

  const closeHandler = () => {
    dispatch(trashDetailChanges({}));
    dispatch(trashRowSelected(null));
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <div className={isVisible === true ? 'dashboard short' : 'dashboard'}>
        <Header>Reports</Header>
        <div className="search">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
        <div className="table-wrapper">
          <ReportTable
            handleClick={recordHandler}
            isVisible={isVisible}
            reportData={preprocess(trashs)}
          />
        </div>
      </div>
      <ReportDeleteModal />
      <Drawer
        {...{
          onDelete: () => dispatch(reportDeleteModalToggle(true)),
          drawerData: trash,
          visible: isVisible,
          onClose: closeHandler,
          isProductPage: true,
        }}
      />
    </>
  );
}

export default ReportsPage;
