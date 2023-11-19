import { Menu, Modal } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Role } from 'services/enums';
import adminMenu from './admin';
import { FiLogOut } from 'react-icons/fi';
import './index.less';
import managementMenu from './management';
import { useDispatch } from 'react-redux';
import AuthAction from 'redux/thunks/authAction';
import { Navigate } from 'react-router-dom';

const useRBACMenu = (role) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  let RoleMenu;

  switch (role) {
    case Role.admin:
      RoleMenu = (
        <>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[adminMenu.defaultRoute]}
            selectedKeys={[location.pathname]}
            className="menu-body"
          >
            {adminMenu.menus.map(({ icon, title, route }) => (
              <Menu.Item key={route} icon={icon} className="menu-item">
                <Link to={route}>{title}</Link>
              </Menu.Item>
            ))}
            <Menu.Item
              className="menu-item"
              onClick={showModal}
              key="logout"
              icon={<FiLogOut />}
            >
              Log Out
            </Menu.Item>
            <Modal
              title="Are you sure?"
              visible={isModalVisible}
              onCancel={handleCancel}
              onOk={() => dispatch(AuthAction.logout())}
              okText="Logout"
            >
              You are about to logout
            </Modal>
          </Menu>
        </>
      );
      break;

    case Role.management:
      RoleMenu = (
        <>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[adminMenu.defaultRoute]}
            selectedKeys={[location.pathname]}
            className="menu-body"
          >
            {managementMenu.menus.map(({ icon, title, route }) => (
              <Menu.Item key={route} icon={icon} className="menu-item">
                <Link to={route}>{title}</Link>
              </Menu.Item>
            ))}
            <Menu.Item
              className="menu-item"
              onClick={showModal}
              key="logout"
              icon={<FiLogOut />}
            >
              Log Out
            </Menu.Item>
            <Modal
              title="Are you sure?"
              visible={isModalVisible}
              onCancel={handleCancel}
              onOk={() => dispatch(AuthAction.logout())}
              okText="Logout"
            >
              You are about to logout
            </Modal>
          </Menu>
        </>
      );
      break;

    default:
      RoleMenu = <Navigate to="/login" replace={true} />;
      break;
  }

  return { RoleMenu };
};

export default useRBACMenu;
