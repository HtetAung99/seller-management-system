import { Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  pdrDetailChanges,
  pdrReportModalToggle,
  pdrUserActionUpdate,
} from 'redux/slices/productRequest';
import PdrAction from 'redux/thunks/productRequestAction';
import { UserActionEnum } from 'services/enums';

const { Text } = Typography;

const PdrReportModal = () => {
  const { showReportModal, pdr } = useSelector((state) => state.pdr);
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(PdrAction.requestToAdmin(pdr.id));
    dispatch(pdrUserActionUpdate(UserActionEnum.report));
    dispatch(pdrDetailChanges({}));
    cancelHandler();
  };
  const cancelHandler = () => dispatch(pdrReportModalToggle());

  return (
    <>
      <Modal
        title="Are you sure?"
        visible={showReportModal}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Space direction="horizontal">
          <Text style={{ fontSize: 19 }}>{pdr?.product?.name} </Text>
          <Text type="secondary">
            will be handled by <Text strong>Management</Text>
          </Text>
        </Space>
      </Modal>
    </>
  );
};

export default PdrReportModal;
