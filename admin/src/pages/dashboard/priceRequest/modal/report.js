import { Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { prrReportModalToggle } from 'redux/slices/priceRequest';
import PrrAction from 'redux/thunks/priceRequestAction';

const { Text } = Typography;

const PrrReportModal = () => {
  const { showReportModal, prr } = useSelector((state) => state.prr);
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(PrrAction.requestToAdmin(prr.id));

    cancelHandler();
  };
  const cancelHandler = () => dispatch(prrReportModalToggle());

  return (
    <Modal
      title="Are you sure?"
      visible={showReportModal}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Space direction="horizontal">
        <Text style={{ fontSize: 19 }}>{prr?.product?.name} </Text>
        <Text type="secondary">
          will be handled by <Text strong>Management</Text>
        </Text>
      </Space>
    </Modal>
  );
};

export default PrrReportModal;
