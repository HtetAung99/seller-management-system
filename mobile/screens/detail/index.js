import React, { useEffect, useState } from 'react';
import EditPriceBtn from './edit-price-btn';
import s from './styles';
import { Text, View, Image, ScrollView } from 'react-native';
import { Status } from './status';
import { Product } from '../../models/product';
import { ProductRequest } from '../../models/productRequest';
import { DetailType } from '../../models/helper';
import { ProductInfo } from './product-info';
import { TabControl } from './control-tab';
import { Overlay } from '../../components/overlay';
import Warehouses from './warehouses';
import Loader from '../../components/loader';
import Trash from '../../models/trash';

const Detail = ({ route }) => {
  const [index, setIndex] = React.useState(0);
  const handleIndexChange = index => setIndex(index);

  const { id, type } = route.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const isPending = type === DetailType.pend;
  const isNotProduct = type !== DetailType.prod;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const detailTypes = {
        pending: async () => {
          const resultReq = await ProductRequest.getProductRequest(id);
          setProduct({ ...resultReq.product, image_url: resultReq.image_url });
          setLoading(false);
        },
        product: async () => {
          const resultPro = await Product.getProduct(id);
          setProduct(resultPro);
          setLoading(false);
        },
        reject: async () => {
          const result = await Trash.getTrash(id);
          setProduct(result);
          setLoading(false);
        },
      };
      return detailTypes[type]();
    }
    fetchData();
  }, [id, setProduct]);

  const {
    created_at,
    article_no,
    category,
    original_barcode,
    name,
    specification,
    vendor_guarantee,
    price,
    srp_price,
    image_url,
  } = product;

  if (loading) return <Loader />;

  return (
    <View style={s.layout}>
      <ScrollView style={{ width: '100%' }}>
        <View>
          <Image style={[s['p-img']]} source={{ uri: image_url }} />
          {isPending && <Overlay size={48} blur={0.5} noClick={true} />}
        </View>
        <View style={s['p-detail']}>
          <View style={s['time-code']}>
            <Status detailType={type} created_at={created_at} />
            <Text style={s['p-article-no']}>{article_no}</Text>
          </View>

          {type === DetailType.prod && (
            <Text style={s.category}>{category}</Text>
          )}

          <ProductInfo {...{ name, original_barcode }} />
          <Text style={{ marginVertical: 10 }}>SRP : {srp_price} Ks</Text>
          <Warehouses {...{ product }} />
          <TabControl {...{ index, handleIndexChange }} />
          <ScrollView nestedScrollEnabled={true}>
            <Text style={s.text}>
              {index === 0 ? specification : vendor_guarantee}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
      <EditPriceBtn
        productId={product.id}
        price={price}
        isNotProduct={isNotProduct}
      />
    </View>
  );
};

export default Detail;
