import { Modal, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userDeleteModalToggle } from 'redux/slices/user';
import UserAction from 'redux/thunks/userAction';
import { showError, showMessage } from 'utils';

const DeleteUserModal = () => {
  const { Text } = Typography;

  const {
    showDeleteModal: { user_name, user_id, visible },
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      await dispatch(UserAction.deleteUser(user_id)).unwrap();
      showMessage(`Successfully deleted user: ${user_name}`);
    } catch (e) {
      console.log(e);
      showError("Can't delete user");
    }
    cancelHandler();
  };

  const cancelHandler = () =>
    dispatch(userDeleteModalToggle({ user_id: null }));

  return (
    <Modal
      title="Are you sure?"
      visible={visible}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Space direction="horizontal">
        <Text style={{ fontSize: 19 }}>{user_name}</Text>
        <Text type="secondary">
          will be <Text type="danger">deleted</Text>.
        </Text>
      </Space>
    </Modal>
  );
};

export default DeleteUserModal;
