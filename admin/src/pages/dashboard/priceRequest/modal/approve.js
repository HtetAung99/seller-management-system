import { Modal, Space, Typography } from 'antd';
import { Timestamp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { prrApproveModalToggle } from 'redux/slices/priceRequest';
import PrrAction from 'redux/thunks/priceRequestAction';
import { HistoryStatus, HistoryType, Role } from 'services/enums';
import History from 'services/models/history';

const { Title, Text } = Typography;

const PrrApproveModal = () => {
  const { prr, showApproveModal } = useSelector((state) => state.prr);
  const { id: user_id, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitHandler = () => {
    const { id: _, ...newHistory } = new History({
      ...prr,
      previous_price: prr.product.price,
      status: HistoryStatus.approve,
      type: HistoryType.price,
      product_name: prr.product.name,
      image: prr.product.image,
      price: '',
      user_id,
      created_at: Timestamp.now(),
    });

    dispatch(PrrAction.moveToProduct(prr, newHistory));
    cancelHandler();
  };

  const cancelHandler = () => dispatch(prrApproveModalToggle());

  const managementSubmitHandler = () => {
    dispatch(PrrAction.managementApprove(prr.id));
    cancelHandler();
  };

  if (role === Role.management) {
    return (
      <>
        <Modal
          title={prr?.product?.name}
          visible={showApproveModal}
          onCancel={cancelHandler}
          onOk={managementSubmitHandler}
        >
          <Text>Are you sure to approve?</Text>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal
        title="Are you sure?"
        visible={showApproveModal}
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
        </Space>
      </Modal>
    </>
  );
};

export default PrrApproveModal;
