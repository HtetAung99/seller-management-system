import Drawer from 'components/drawer';
import Header from 'components/header';
import PromotionsTab from './promotions';
import withTabFocus from './withTabFocus';
import PriceRequestTab from './priceRequest';
import Search from './productRequest/search';
import VendorAction from 'redux/thunks/vendorAction';
import CategoryAction from 'redux/thunks/categoryAction';
import ProductRequestTab from 'pages/dashboard/productRequest';
import { isEmptyObj } from 'utils';
import { Menu, Tabs, Badge } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pdrDetailChanges,
  pdrRowSelected,
  pdrGbSelected,
} from 'redux/slices/productRequest';
import {
  prrDetailChanges,
  prrGbSelected,
  prrRowSelected,
} from 'redux/slices/priceRequest';
import './index.less';

const { TabPane } = Tabs;

const tabs = ['pdr', 'prr', 'promotion'];

const DrawerWithTabFocus = withTabFocus(Drawer);

function Dashboard() {
  const { pdrList, pdr } = useSelector((state) => state.pdr);
  const { prrList, prr } = useSelector((state) => state.prr);
  const { promoList } = useSelector((state) => state.promo);
  const [groupByState, setGroupByState] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const tabPanes = [
    {
      tabName: 'Product Requests',
      count: pdrList.length,
      component: <ProductRequestTab {...{ groupByState, searchInput }} />,
    },
    {
      tabName: 'Price Requests',
      count: prrList.length,
      component: <PriceRequestTab {...{ groupByState, searchInput }} />,
    },
    {
      tabName: 'Promotions',
      count: promoList.length,
      component: <PromotionsTab />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('pdr');

  const isVisible = !isEmptyObj(pdr) || !isEmptyObj(prr);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VendorAction.fetchVendors());
    dispatch(CategoryAction.fetchCategories());

    return () => {
      closeHandler();
    };
  }, [dispatch]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          setGroupByState('vendor');
          closeHandler();
        }}
        key="1"
      >
        Vendor
      </Menu.Item>
      {currentTab === 'prr' && (
        <Menu.Item
          onClick={() => {
            setGroupByState('category');
            closeHandler();
          }}
          key="2"
        >
          Category
        </Menu.Item>
      )}
    </Menu>
  );

  const closeHandler = () => {
    dispatch(pdrDetailChanges({}));
    dispatch(prrDetailChanges({}));
    dispatch(pdrRowSelected(null));
    dispatch(prrRowSelected(null));
    dispatch(pdrGbSelected(null));
    dispatch(prrGbSelected(null));
  };

  return (
    <>
      <div className={isVisible ? 'dashboard short' : 'dashboard'}>
        <Header>Dashboard</Header>
        <Search
          {...{
            setSearchInput,
            groupByState,
            menu,
            setGroupByState,
            closeHandler,
          }}
        />
        <div className="table-wrapper">
          <Tabs
            onChange={(activeKey) => {
              setCurrentTab(tabs[activeKey]);
              setGroupByState(null);
              closeHandler();
            }}
            defaultActiveKey="0"
          >
            {tabPanes.map(({ tabName, count, component }, index) => (
              <TabPane
                key={index}
                tab={
                  <>
                    <span className="nav">{tabName}</span>
                    <Badge count={count} className="badge" />
                  </>
                }
              >
                {component}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>

      <DrawerWithTabFocus
        curTab={currentTab}
        visible={isVisible}
        onClose={closeHandler}
      />
    </>
  );
}

export default Dashboard;
