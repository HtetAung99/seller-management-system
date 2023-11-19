import { Modal, Space, Typography } from 'antd';
import { Timestamp } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  pdrRejectModalToggle,
  pdrUserActionUpdate,
} from 'redux/slices/productRequest';
import PdrAction from 'redux/thunks/productRequestAction';
import {
  HistoryStatus,
  HistoryType,
  UserActionEnum,
  TrashStatus,
} from 'services/enums';
import History from 'services/models/history';
import Trash from 'services/models/trash';

const { Text } = Typography;

const PdrRejectModal = () => {
  const { showRejectModal, pdr } = useSelector((state) => state.pdr);
  const { id: user_id } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const { product, vendor_id, type: management_status, id } = pdr;
      const { id: _, ...newTrash } = new Trash({
        ...product,
        vendor_id,
        management_status,
        status: TrashStatus.rejected,
        created_at: Timestamp.now(),
      });

      const { id: __, ...newHistory } = new History({
        type: HistoryType.product,
        status: HistoryStatus.reject,
        product_name: product.name,
        price: product.price,
        image: product.image,
        vendor_id,
        user_id,
        created_at: Timestamp.now(),
      });

      dispatch(PdrAction.moveToTrash(id, newTrash, newHistory));
      dispatch(pdrUserActionUpdate(UserActionEnum.reject));
      cancelHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => dispatch(pdrRejectModalToggle());

  return (
    <Modal
      title="Are you sure?"
      visible={showRejectModal}
      onOk={submitHandler}
      onCancel={cancelHandler}
    >
      <Space direction="horizontal">
        <Text style={{ fontSize: 19 }}>{pdr?.product?.name} </Text>
        <Text type="secondary">
          will be <Text type="danger">rejected</Text>.
        </Text>
      </Space>
    </Modal>
  );
};

export default PdrRejectModal;
