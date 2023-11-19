import React, { useEffect, useState } from 'react';
import SearchBar from 'components/search-bar';
import CategoryAction from 'redux/thunks/categoryAction';
import WarehouseAction from 'redux/thunks/warehouseAction';
import { useSelector, useDispatch } from 'react-redux';
import { showError } from 'utils';
import { ModalForm } from 'components/modal-form';
import { Button } from 'antd';
import { BiCategory } from 'react-icons/bi';
import { IoStorefrontOutline } from 'react-icons/io5';

export default function Search({ setSearchInput }) {
  return (
    <div className="search">
      <SearchBar {...{ setSearchInput }} />
      <SelectorBtn type="Categories" />
      <SelectorBtn type="Warehouses" />
    </div>
  );
}

const SelectorBtn = ({ type }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { categories } = useSelector((state) => state.categories);
  const { warehouses } = useSelector((state) => state.warehouses);
  const isCategory = type === 'Categories';

  const showModal = () => setVisible(true);
  const handleChange = (event) => setInputValue(event.target.value);

  const handleCancel = () => {
    setVisible(false);
    setInputValue('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        isCategory
          ? CategoryAction.createCategory(inputValue)
          : WarehouseAction.createWarehouses(inputValue)
      ).unwrap();
      setInputValue('');
    } catch (e) {
      showError(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(
        isCategory
          ? CategoryAction.deleteCategory(id)
          : WarehouseAction.deleteWarehouse(id)
      ).unwrap();
    } catch (e) {
      showError(`Can't delete. ${e.message}`);
    }
  };

  useEffect(() => {
    async function loadWarehouses() {
      try {
        await dispatch(WarehouseAction.fetchWarehouses()).unwrap();
      } catch (e) {
        showError(e.message);
      }
    }

    if (!isCategory) {
      loadWarehouses();
    }
  }, [dispatch, isCategory]);

  return (
    <>
      <Button onClick={showModal} className="flex-row-center">
        {isCategory ? (
          <BiCategory size={22} />
        ) : (
          <IoStorefrontOutline size={22} />
        )}
        <span className="pl-2">{type}</span>
      </Button>
      <ModalForm
        {...{
          visible,
          handleCancel,
          handleSubmit,
          handleChange,
          handleDelete,
          type,
          inputValue: inputValue,
          lists: isCategory ? categories : warehouses,
        }}
      />
    </>
  );
};
