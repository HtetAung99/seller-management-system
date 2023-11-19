import { Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { productDeleteModalToggle } from 'redux/slices/product';
import ProductAction from 'redux/thunks/productAction';

const { Text } = Typography;

const ProductDeleteModal = () => {
  const { showProductDeleteModal, product } = useSelector(
    (state) => state.products
  );
  const { id: user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      dispatch(ProductAction.moveToTrash({ product, user_id }));
      cancelHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => dispatch(productDeleteModalToggle());

  return (
    <Modal
      title="Are you sure?"
      visible={showProductDeleteModal}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Space direction="horizontal">
        <Text style={{ fontSize: 19 }}>{product?.name} </Text>
        <Text type="secondary">
          will be <Text type="danger">deleted</Text>.
        </Text>
      </Space>
    </Modal>
  );
};

export default ProductDeleteModal;
