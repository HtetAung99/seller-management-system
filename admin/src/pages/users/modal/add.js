import { Form, Input, Modal, Select } from 'antd';
import Spinner from 'components/spin';
import { useDispatch, useSelector } from 'react-redux';
import { userAddModalToggle } from 'redux/slices/user';
import UserAction from 'redux/thunks/userAction';
import { Role } from 'services/enums';
import { showError, showMessage } from 'utils';
import './add.less';

const { Option } = Select;

const AddUserModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { status, showAddModal } = useSelector((state) => state.users);

  const submitHandler = async () => {
    try {
      const result = await form.validateFields();
      const user = await dispatch(UserAction.addAdminsNStaffs(result)).unwrap();
      showMessage(`Successfully created ${user.display_name}`);
    } catch (error) {
      // Need to throw error to let antd handle error on ui
      if (error?.errorFields) {
        throw Error(error);
      }
      showError(error.message);
    }
    form.resetFields();
  };

  const cancelHandler = () => {
    form.resetFields();
    dispatch(userAddModalToggle());
  };

  return (
    <>
      <Modal
        title="Add User"
        visible={showAddModal}
        onOk={submitHandler}
        onCancel={cancelHandler}
        okText="Save"
      >
        {status === 'loading' && <Spinner />}
        <Form form={form} layout="vertical" name="user-add">
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            required
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={Role.admin}>Admin</Option>
              <Option value={Role.staff}>Staff</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            required
            rules={[
              { required: true },
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className="custom-input-row ">
            <Form.Item
              label="Password"
              name="password"
              required
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="c_password"
              required
              rules={[
                { required: true, message: 'Confirm Password is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserModal;
