import { Modal, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vendorDeleteModalToggle } from 'redux/slices/vendor';
import VendorAction from 'redux/thunks/vendorAction';
import Product from 'services/models/product';
import { showError, showMessage } from 'utils';

const DeleteVendorModal = () => {
  const { Text } = Typography;

  const [productsExist, setProductsExist] = useState(false);

  const {
    showDeleteModal: { vendor_name, vendor_id, visible },
  } = useSelector((state) => state.vendors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor_id) {
      Product.productsExistByVendorId(vendor_id).then((result) =>
        setProductsExist(result)
      );
    }
  }, [vendor_id]);

  const submitHandler = async () => {
    try {
      await dispatch(VendorAction.deleteVendor(vendor_id)).unwrap();
      showMessage(`Successfully deleted vendor: ${vendor_name}`);
    } catch (e) {
      console.log(e);
      showError(`Can't delete vendor.${e.message}`);
    }
    cancelHandler();
  };

  const cancelHandler = () =>
    dispatch(vendorDeleteModalToggle({ vendor_id: null }));

  return (
    <Modal
      title="Are you sure?"
      visible={visible}
      onOk={submitHandler}
      onCancel={cancelHandler}
      okButtonProps={{ disabled: productsExist }}
    >
      <Space direction="vertical">
        <Space direction="horizontal">
          <Text style={{ fontSize: 19 }}>{vendor_name}</Text>
          <Text type="secondary">
            will be <Text type="danger">deleted</Text>.
          </Text>
        </Space>
        {productsExist && (
          <Space direction="horizontal">
            <span style={{ color: 'red' }}>*</span>
            <span
              style={{
                color: '#bbb',
                fontSize: 13,
              }}
            >
              There are some products created by this vendor. Make sure you
              delete these products first.
            </span>
          </Space>
        )}
      </Space>
    </Modal>
  );
};

export default DeleteVendorModal;
