import { useEffect, useState } from 'react';
import { productCheckModalToggle } from 'redux/slices/productRequest';
import ProductAction from 'redux/thunks/productAction';
import { Divider, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const ProductsCheckModal = ({ selectedData }) => {
  const { showProductCheckModal } = useSelector((state) => state.pdr);

  const [sameProducts, setSameProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(productCheckModalToggle());
    setSameProducts([]);
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const result = (
          await dispatch(
            ProductAction.getProductsByBarcode(
              selectedData.product.original_barcode
            )
          ).unwrap()
        ).filter((r) => r.id !== selectedData.product.id);
        setLoading(false);

        if (isMounted) {
          setSameProducts(result);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (showProductCheckModal && selectedData.product?.original_barcode) {
      loadData();
    }
    return () => {
      isMounted = false;
    };
  }, [
    selectedData,
    dispatch,
    setSameProducts,
    setLoading,
    showProductCheckModal,
  ]);

  return (
    <>
      <Modal
        className="product-check-modal"
        title={
          <div className="cst-modal-header">
            Check products
            <span onClick={cancelHandler}> X </span>
          </div>
        }
        visible={showProductCheckModal}
        onCancel={cancelHandler}
        footer={null}
        bodyStyle={{
          maxHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card
          {...{
            img: selectedData.image,
            productInfo: selectedData.product,
            vendor_name: selectedData.vendor_name,
          }}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ProductsSection
            {...{
              sameProducts,
              barcode: selectedData.product?.original_barcode,
            }}
          />
        )}
      </Modal>
    </>
  );
};

const ProductsSection = ({ sameProducts, barcode }) => {
  return (
    <div className="product-section">
      {sameProducts.length > 0 ? (
        <>
          <Divider
            style={{
              margin: 8,
            }}
            orientation="left"
            orientationMargin={0}
            plain
          >
            Products with same barcode ({barcode})
          </Divider>
          <div className="same-item">
            {sameProducts.map((p) => (
              <Card
                {...{
                  img: p.image,
                  productInfo: p,
                  vendor_name: p.vendor_name,
                  key: p.id,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div>No Products with same barcode</div>
      )}
    </div>
  );
};

const Card = ({ img, productInfo, vendor_name }) => (
  <div className="cst-card">
    <div className="card-img">
      <img src={img} alt="" />
    </div>
    <div className="card-info">
      <span className="name">{productInfo.name}</span>
      <span className="price">{productInfo.price} Ks</span>
      <span className="vendor-name">{vendor_name}</span>
    </div>
  </div>
);

export default ProductsCheckModal;
