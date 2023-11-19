import { Form, Input, Modal } from 'antd';
import Spinner from 'components/spin';
import { useDispatch, useSelector } from 'react-redux';
import { vendorAddModalToggle } from 'redux/slices/vendor';
import VendorAction from 'redux/thunks/vendorAction';
import Vendor from 'services/models/vendor';
import { showError, showMessage } from 'utils';
import './add.less';

const AddVendorModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { showAddModal, status } = useSelector((state) => state.vendors);

  const submitHandler = async () => {
    try {
      const result = await form.validateFields();
      const { id, ...newVendor } = new Vendor({ ...result, active: true });
      const vendor = await dispatch(VendorAction.addVendor(newVendor)).unwrap();
      showMessage(`Successfully created ${vendor.name}`);
    } catch (error) {
      showError(error.message);
    }
    form.resetFields();
  };

  const cancelHandler = () => {
    dispatch(vendorAddModalToggle());
  };

  return (
    <>
      <Modal
        title="Add vendor"
        visible={showAddModal}
        onOk={submitHandler}
        onCancel={cancelHandler}
        okText="Save"
      >
        {status === 'loading' && <Spinner />}
        <Form form={form} layout="vertical" name="vender-add">
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Owner"
            name="owner"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div className="input-row">
            <Form.Item
              label="Phone Number"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddVendorModal;
