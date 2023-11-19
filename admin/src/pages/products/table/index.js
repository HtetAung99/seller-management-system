import React, { useState } from 'react';
import ProductAction from 'redux/thunks/productAction';
import { Table, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { productDetailChanges, productRowSelected } from 'redux/slices/product';
import { addPagination, differenceObject, showError, showMessage } from 'utils';
import { pageSize } from 'utils/config';
import { EditableCell } from './editable-cell';
import { cols } from './columns';
import './index.less';

function ProductTable({ productData, handleClick, isVisible }) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [curPagination, setCurPagination] = useState(1);
  const { categories } = useSelector((state) => state.categories);
  const { vendors } = useSelector((state) => state.vendors);
  const { selectedRowIndex } = useSelector((state) => state.products);
  const { id: user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isEditing = (record) => record.id === editingKey;

  const handleDelete = async (record) => {
    try {
      dispatch(ProductAction.moveToTrash({ product: record, user_id }));
      showMessage(`Successfully deleted product: ${record.name}`);
    } catch (e) {
      console.log(e);
      showError("Can't delete product");
    }
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (old) => {
    try {
      const rawUpdate = await form.validateFields();
      const id = old.id;
      const update = differenceObject(rawUpdate, old);
      await dispatch(ProductAction.updateProduct({ id, update })).unwrap();
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      showError("Can't update vendor");
    }
  };

  const paginationHandler = (p) => {
    cancel();
    dispatch(productRowSelected(null));
    dispatch(productDetailChanges({}));
    setCurPagination(p);
  };

  const getIndex = addPagination(curPagination, pageSize.products);

  const columns = cols(
    vendors,
    categories,
    getIndex,
    isEditing,
    save,
    setEditingRow,
    cancel,
    edit,
    handleDelete
  );

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    let inputType;

    const typeAssign = {
      vendor_name: 'switch',
      category: 'switch',
      original_barcode: 'text',
      name: 'text',
      ir: 'text',
    };

    inputType = typeAssign[col.dataIndex];

    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  const filteredOutColumns = ['vendor_name', 'srp_price', 'operation'];

  const finalColumns = isVisible
    ? mergedColumns.filter(
        (col) => filteredOutColumns.indexOf(col.dataIndex) === -1
      )
    : mergedColumns;

  return (
    <Form form={form} component={false} name="product-form">
      <Table
        components={{
          body: { cell: EditableCell },
        }}
        onRow={(record, index) => {
          return {
            onClick: (event) => {
              if (editingRow !== null) return;
              if (selectedRowIndex === index) {
                dispatch(productRowSelected(null));
                handleClick({});
              } else {
                dispatch(productRowSelected(index));
                handleClick(record);
              }
            },
          };
        }}
        dataSource={productData}
        columns={finalColumns}
        rowClassName={(record, index) =>
          `editable-row ${selectedRowIndex === index ? 'selectedRow' : ''}`
        }
        pagination={{
          onChange: paginationHandler,
          pageSize: pageSize.products,
        }}
        rowKey="id"
      />
    </Form>
  );
}

export default ProductTable;
