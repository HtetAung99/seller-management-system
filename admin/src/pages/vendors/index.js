import React, { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import VendorTable from './table';
import Status from './status';
import { useDispatch, useSelector } from 'react-redux';
import VendorAction from 'redux/thunks/vendorAction';
import Header from 'components/header';
import { productDetailChanges, productRowSelected } from 'redux/slices/product';
import { pdrDetailChanges } from 'redux/slices/productRequest';
import { prrDetailChanges } from 'redux/slices/priceRequest';
import { PlusSquareOutlined } from '@ant-design/icons';
import AddVendorModal from './modal/add';
import { vendorAddModalToggle } from 'redux/slices/vendor';
import { Role } from 'services/enums';
import { showError } from 'utils';
import SearchBar from 'components/search-bar';
import Spinner from 'components/spin';
import DeleteVendorModal from './modal/delete';

export default function VendorPage() {
  const { vendors, status, isInitial } = useSelector((state) => state.vendors);
  const { role } = useSelector((state) => state.auth);
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        await dispatch(VendorAction.fetchVendors()).unwrap();
      } catch (error) {
        console.log(error);
        showError("Can't fetch vendors");
      }
    };

    if (isInitial) {
      fetchVendors();
    }
    // toggle drawers
    dispatch(productDetailChanges({}));
    dispatch(pdrDetailChanges({}));
    dispatch(prrDetailChanges({}));

    // remove row selection from ProductPage
    dispatch(productRowSelected(null));
  }, [dispatch, isInitial]);

  const activeVendors = vendors.filter((vendor) => vendor.active);
  const inActiveVendors = vendors.filter((vendor) => !vendor.active);

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
      <div className="vendors">
        <Header>Vendors</Header>

        <div className="search">
          <SearchBar setSearchInput={setSearchInput} />
          {role === Role.management && (
            <Button onClick={() => dispatch(vendorAddModalToggle(true))}>
              <PlusSquareOutlined />
              Add Vendor
            </Button>
          )}
        </div>

        <Status status={true} count={activeVendors.length} />
        <Divider style={{ padding: 0, margin: '.7rem 0' }} />
        <VendorTable vendorData={preprocess(activeVendors)} />

        <Status status={false} count={inActiveVendors.length} />
        <Divider style={{ padding: 0, margin: '.7rem 0' }} />
        <VendorTable vendorData={preprocess(inActiveVendors)} />
      </div>

      <AddVendorModal />
      <DeleteVendorModal />
    </>
  );
}
