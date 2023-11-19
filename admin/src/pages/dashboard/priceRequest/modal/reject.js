import { Modal, Space, Typography } from 'antd';
import { Timestamp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { prrRejectModalToggle } from 'redux/slices/priceRequest';
import PrrAction from 'redux/thunks/priceRequestAction';
import { HistoryStatus, HistoryType } from 'services/enums';
import History from 'services/models/history';

const { Text, Title } = Typography;

const PrrRejectModal = () => {
  const { showRejectModal, prr } = useSelector((state) => state.prr);
  const { id: user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const { id: _, ...newHistory } = new History({
        ...prr,
        previous_price: prr.product.price,
        status: HistoryStatus.reject,
        type: HistoryType.price,
        user_id,
        product_name: prr.product.name,
        image: prr.product.image,
        price: '',
        created_at: Timestamp.now(),
      });

      dispatch(PrrAction.reject(prr, newHistory));
      cancelHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => dispatch(prrRejectModalToggle());

  return (
    <Modal
      title="Are you sure?"
      visible={showRejectModal}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Title level={4}>{prr?.product?.name}</Title>
      <Space>
        <Text type="secondary" delete>
          {prr?.product?.price} MMK
        </Text>
        <span>{'>>'}</span>
        <Text type="success">{prr?.price_requested} MMK</Text>
        <Text type="danger">This request will be rejected</Text>.
      </Space>
    </Modal>
  );
};

export default PrrRejectModal;
