import { Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  reportDeleteModalToggle,
  trashDetailChanges,
  trashRowSelected,
} from 'redux/slices/trash';
import TrashAction from 'redux/thunks/trashAction';

const { Text } = Typography;

const ReportDeleteModal = () => {
  const { showReportDeleteModal, trash } = useSelector((state) => state.trashs);
  const { id: user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      dispatch(TrashAction.deleteTrash({ trash: trash, user_id }));
      cancelHandler();
      dispatch(trashDetailChanges({}));
      dispatch(trashRowSelected(null));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => dispatch(reportDeleteModalToggle());

  return (
    <Modal
      title="Are you sure?"
      visible={showReportDeleteModal}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Space direction="horizontal">
        <Text style={{ fontSize: 19 }}>{trash?.name} </Text>
        <Text type="secondary">
          will be permanantly <Text type="danger">deleted</Text>.
        </Text>
      </Space>
    </Modal>
  );
};

export default ReportDeleteModal;
