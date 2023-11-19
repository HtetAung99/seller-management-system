import { Form, Modal, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  pdrApproveModalToggle,
  pdrUserActionUpdate,
} from 'redux/slices/productRequest';
import PdrAction from 'redux/thunks/productRequestAction';
import {
  HistoryStatus,
  HistoryType,
  Role,
  UserActionEnum,
} from 'services/enums';
import Product from 'services/models/product';
import History from 'services/models/history';
import { Timestamp } from 'firebase/firestore';

const PdrApproveModal = () => {
  const { pdr, showApproveModal } = useSelector((state) => state.pdr);
  const { id: user_id } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { Text } = Typography;

  const submitHandler = async () => {
    try {
      await form.validateFields();
      const category_id = form.getFieldValue('category');
      const { product, vendor_id, type: management_status, id } = pdr;
      const { id: _, ...newProduct } = new Product({
        ...product,
        price_history: [
          {
            price_confirmed: product.price,
            created_at: Timestamp.now(),
          },
        ],
        category_id,
        vendor_id,
        management_status,
        ir: '',
        created_at: Timestamp.now(),
      });

      const { id: __, ...newHistory } = new History({
        type: HistoryType.product,
        status: HistoryStatus.approve,
        product_name: product.name,
        image: product.image,
        price: product.price,
        vendor_id,
        user_id,
        created_at: Timestamp.now(),
      });

      dispatch(PdrAction.moveToProduct(id, newProduct, newHistory));
      dispatch(pdrUserActionUpdate(UserActionEnum.approve));
      cancelHandler();
    } catch (error) {}
  };

  const cancelHandler = () => dispatch(pdrApproveModalToggle());

  const managementSubmitHandler = () => {
    dispatch(PdrAction.managementApprove(pdr.id));
    cancelHandler();
  };

  if (role === Role.management) {
    return (
      <>
        <Modal
          title={pdr?.product?.name}
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
        title={pdr?.product?.name}
        visible={showApproveModal}
        onOk={submitHandler}
        onCancel={cancelHandler}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Please choose category"
            name="category"
            required
            rules={[{ required: true }]}
          >
            <Select>
              {categories?.map(({ id, name }, i) => (
                <Select.Option value={id} key={i}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PdrApproveModal;
