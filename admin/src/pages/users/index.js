import React, { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import './index.less';
import UserTable from './table';
import Status from './status';
import { useDispatch, useSelector } from 'react-redux';
import UserAction from 'redux/thunks/userAction';
import Header from 'components/header';
import { productDetailChanges, productRowSelected } from 'redux/slices/product';
import { pdrDetailChanges } from 'redux/slices/productRequest';
import { prrDetailChanges } from 'redux/slices/priceRequest';
import { Role } from 'services/enums';
import { PlusSquareOutlined } from '@ant-design/icons';
import { userAddModalToggle } from 'redux/slices/user';
import AddUserModal from './modal/add';
import { showError } from 'utils';
import SearchBar from 'components/search-bar';
import Spinner from 'components/spin';
import DeleteUserModal from './modal/delete';

export default function UserPage() {
  const {
    list: users,
    status,
    isInitial,
  } = useSelector((state) => state.users);

  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchAdminsNStaffs = async () => {
      try {
        await dispatch(UserAction.fetchAdminsNStaffs()).unwrap();
      } catch (error) {
        console.log(error);
        showError("Can't fetch users");
      }
    };

    if (isInitial) {
      fetchAdminsNStaffs();
    }

    // toggle drawers
    dispatch(productDetailChanges({}));
    dispatch(pdrDetailChanges({}));
    dispatch(prrDetailChanges({}));

    // remove row selection from ProductPage
    dispatch(productRowSelected(null));
  }, [dispatch, isInitial]);

  const activeUsers = users?.filter((user) => user.active_status);
  const inActiveUsers = users?.filter((user) => !user.active_status);

  const preprocess = (tableData) => {
    return tableData.filter((d) =>
      Object.values(d).join(',').toLowerCase().includes(searchInput)
    );
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <div className="users">
        <Header>Users</Header>

        <div className="search">
          <SearchBar setSearchInput={setSearchInput} />
          {role === Role.management && (
            <Button onClick={() => dispatch(userAddModalToggle(true))}>
              <PlusSquareOutlined />
              Add user
            </Button>
          )}
        </div>

        <Status status={true} count={activeUsers.length} />
        <Divider style={{ padding: 0, margin: '.7rem 0' }} />
        <UserTable userData={preprocess(activeUsers)} />

        <Status status={false} count={inActiveUsers.length} />
        <Divider style={{ padding: 0, margin: '.7rem 0' }} />
        <UserTable userData={preprocess(inActiveUsers)} />
      </div>

      <AddUserModal />
      <DeleteUserModal />
    </>
  );
}
