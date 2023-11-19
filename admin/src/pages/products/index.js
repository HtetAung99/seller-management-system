import Drawer from 'components/drawer';
import Header from 'components/header';
import ProductTable from './table';
import ProductAction from 'redux/thunks/productAction';
import { compose } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productDeleteModalToggle,
  productDetailChanges,
  productRowSelected,
} from 'redux/slices/product';
import { isEmptyObj, showError } from 'utils';
import Search from './search';
import Spinner from 'components/spin';
import ProductDeleteModal from './modal/delete';

const ProductsPage = () => {
  const {
    products,
    status,
    product,
    isInitial: isProductInitial,
  } = useSelector((state) => state.products);

  const visible = !isEmptyObj(product);

  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(ProductAction.fetchProducts()).unwrap();
      } catch (e) {
        console.log(e);
        showError("Can't fetch products");
      }
    };

    if (isProductInitial) {
      fetchProducts();
    }
    return () => {
      closeHandler();
    };
  }, [dispatch, isProductInitial]);

  const recordHandler = compose(dispatch, productDetailChanges);

  const closeHandler = () => {
    dispatch(productDetailChanges({}));
    dispatch(productRowSelected(null));
  };

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

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <div className={visible ? 'dashboard short' : 'dashboard'}>
        <Header>Products</Header>
        <Search {...{ setSearchInput }} />

        <div className="table-wrapper">
          <ProductTable
            handleClick={recordHandler}
            productData={preprocess(products)}
            isVisible={visible}
          />
        </div>
      </div>
      <ProductDeleteModal />
      <Drawer
        {...{
          visible,
          onClose: closeHandler,
          drawerData: product,
          isProductPage: true,
          onDelete: () => dispatch(productDeleteModalToggle(true)),
        }}
      />
    </>
  );
};

export default ProductsPage;
