import Accordion from 'components/drawer/accordion';
import { Button, Dropdown, Menu, Divider } from 'antd';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { getCollapseData } from './collapse-data';
import './index.less';
import { useSelector } from 'react-redux';
import { Role } from 'services/enums';

function Drawer({
  visible,
  drawerData,
  onClose,
  isProductPage,
  onReject,
  onApprove,
  onReport,
  onDelete,
  productCheckModalHandler,
}) {
  const {
    name,
    image,
    original_barcode,
    price,
    specification,
    vendor_guarantee,
    warehouse_info,
    vendor_name,
    vendor_phone,
    category,
    price_requested,
    created_at,
    price_history,
    srp_price,
  } = drawerData;

  const { role } = useSelector((state) => state.auth);

  const collapseData = getCollapseData(
    specification,
    vendor_guarantee,
    price_history
  );

  const menu = (
    <Menu>
      {!drawerData?.from_management && role === Role.admin ? (
        <Menu.Item onClick={onReport} key="1">
          Report
        </Menu.Item>
      ) : (
        <></>
      )}
      <Menu.Item onClick={productCheckModalHandler} key="2">
        Check products
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={visible ? 'drawer visible' : 'drawer'}>
      <div className="user-actions">
        {!isProductPage && (
          <Dropdown overlay={menu}>
            <MoreOutlined style={{ transform: 'rotate(90deg)' }} />
          </Dropdown>
        )}
        <CloseOutlined onClick={onClose} />
      </div>

      <img src={image} alt="" className="image" />

      {created_at && (
        <div style={{ color: '#000', opacity: 0.5, marginBottom: 4 }}>
          {isProductPage ? 'Approved' : 'Posted'} at {created_at}
        </div>
      )}

      <div className="product-info">
        <span className="title">{name}</span>
        <span className="barcode">{original_barcode}</span>
      </div>

      <div>
        {price_requested ? (
          <div>
            <span
              style={{
                marginRight: 15,
              }}
            >
              {price} Ks
            </span>
            <span
              style={{
                marginRight: 15,
              }}
            >
              &gt;
            </span>
            <span
              style={{
                color: '#FF7A00',
              }}
            >
              {price_requested} Ks
            </span>
          </div>
        ) : (
          <span className="price">{`${(+price).toLocaleString(
            'en-US'
          )} Ks`}</span>
        )}
      </div>

      <span className="price">SRP Price - {srp_price} Ks</span>

      {category && <span>Category: {category}</span>}

      <Divider style={{ margin: '.5rem 0' }} />

      <div>
        <h3>Vendor Info</h3>
        <ul style={{ padding: '0 0 0 2rem', margin: 0 }}>
          <li style={{ color: '#000', opacity: 0.6 }}>{vendor_name}</li>
          <li style={{ color: '#000', opacity: 0.6 }}>{vendor_phone}</li>
        </ul>
      </div>

      <Divider style={{ margin: '.5rem 0' }} />

      <div>
        <h3 style={{ marginBottom: '.1rem' }}>Warehouse Info</h3>
        <ul style={{ padding: '0 0 0 2rem', margin: 0 }}>
          {warehouse_info
            ?.split(',')
            .filter(Boolean)
            .map((data, index) => (
              <li key={index} style={{ color: '#000', opacity: 0.6 }}>
                {data}
              </li>
            ))}
        </ul>
      </div>

      <Divider style={{ margin: 0, marginTop: '.5rem' }} />
      <Accordion data={collapseData} />

      <div className="btn-group">
        {isProductPage ? (
          <Button danger onClick={onDelete}>
            Delete
          </Button>
        ) : (
          <>
            <Button danger onClick={onReject}>
              Reject
            </Button>
            <Button type="primary" onClick={onApprove}>
              Approve
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
