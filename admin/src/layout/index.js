import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import useRBACMenu from './menus/useRBACMenu';
import Spinner from 'components/spin';
import './index.less';

const { Sider, Content } = Layout;

function MainLayout() {
  const { loading, role } = useSelector((state) => state.auth);
  const { RoleMenu } = useRBACMenu(role);

  if (loading) <Spinner />;

  return (
    <Layout style={{ height: '100vh', display: 'flex' }}>
      <Sider breakpoint="lg" collapsedWidth="0" className="sidebar">
        <h2 className="banner">C 4 E</h2>
        {RoleMenu}
      </Sider>

      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
