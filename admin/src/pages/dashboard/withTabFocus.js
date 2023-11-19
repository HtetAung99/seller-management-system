import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  prrApproveModalToggle,
  prrRejectModalToggle,
  prrReportModalToggle,
} from 'redux/slices/priceRequest';
import {
  pdrApproveModalToggle,
  pdrRejectModalToggle,
  pdrReportModalToggle,
  productCheckModalToggle,
} from 'redux/slices/productRequest';
import PrrApproveModal from './priceRequest/modal/approve';
import PrrRejectModal from './priceRequest/modal/reject';
import PrrReportModal from './priceRequest/modal/report';
import PdrApproveModal from './productRequest/modal/approve';
import ProductsCheckModal from './productRequest/modal/products-check';
import PdrRejectModal from './productRequest/modal/reject';
import PdrReportModal from './productRequest/modal/report';

function withTabFocus(Component) {
  return function ({ curTab, visible, onClose }) {
    const { vendors } = useSelector((state) => state.vendors);
    const { pdr } = useSelector((state) => state.pdr);
    const { prr } = useSelector((state) => state.prr);

    const dispatch = useDispatch();

    const [drawerData, setDrawerData] = useState(pdr);

    const requestActions = {
      pdr: {
        approve: () => dispatch(pdrApproveModalToggle(true)),
        reject: () => dispatch(pdrRejectModalToggle(true)),
        report: () => dispatch(pdrReportModalToggle(true)),
      },
      prr: {
        approve: () => dispatch(prrApproveModalToggle(true)),
        reject: () => dispatch(prrRejectModalToggle(true)),
        report: () => dispatch(prrReportModalToggle(true)),
      },
    };

    const productCheckModalHandler = () =>
      dispatch(productCheckModalToggle(true));

    const retrieve = (data) => {
      if (!visible) {
        return;
      }
      const { product, ...restData } = data;
      const { image, ...restProductData } = product;
      return { ...restProductData, ...restData };
    };

    useEffect(() => {
      const tabData = {
        pdr,
        prr,
      };

      setDrawerData({
        ...retrieve(tabData[curTab]),
        vendor_phone: vendors.filter(
          (vendor) => vendor.id === tabData[curTab]?.vendor_id
        )[0]?.phone,
      });
    }, [curTab, pdr, prr, setDrawerData, vendors]);

    return (
      <>
        <Component
          visible={visible}
          onClose={onClose}
          drawerData={drawerData}
          isProductPage={false}
          onApprove={requestActions[curTab]?.approve}
          onReport={requestActions[curTab]?.report}
          onReject={requestActions[curTab]?.reject}
          productCheckModalHandler={productCheckModalHandler}
        />
        <PdrReportModal />
        <PrrReportModal />
        <PdrApproveModal />
        <PrrApproveModal />
        <PdrRejectModal />
        <PrrRejectModal />
        <ProductsCheckModal selectedData={curTab === 'pdr' ? pdr : prr} />
      </>
    );
  };
}

export default withTabFocus;
