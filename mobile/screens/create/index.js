import React, { useContext, useEffect, useState } from 'react';
import TextArea from './text-area';
import * as Yup from 'yup';
import s from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../components/loader';
import { View, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../../AuthProvider';
import { Warehouse } from '../../models/warehouse';
import { ProductRequest } from '../../models/productRequest';
import { CloudStorage } from '../../models/cloudStorage';
import { Product } from '../../models/product';
import { TimeStamp } from '../../models/helper';
import { ProductName } from './product-name';
import { ProductInfo } from './product-info';
import { ProductPhoto } from './product-photo';
import { ProductWh } from './product-wh';
import { SubmitBtn } from './submit-btn';

function Create({ navigation }) {
  const { vendorId } = useContext(AuthContext);
  const [warehouses, setWarehouses] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await Warehouse.getWarehouses();
      setWarehouses(result);
    }

    fetchData();
  }, [setWarehouses]);

  const cameraHandler = async () => {
    try {
      const result = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      });
      setImage(result);
    } catch (error) {
      console.log('Camera Error', error);
    }
  };

  const galleryHandler = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });
      setImage(result);
    } catch (error) {
      console.log('Camera Error', error);
    }
  };

  const submitHandler = async values => {
    if (!image) {
      return Alert.alert("Can't Submit", 'You need to upload photo', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
    values.warehouse_info = warehouses
      .filter(wh => wh.checked === true)
      .map(res => res.name)
      .toString();

    try {
      setLoading(true);
      const img = await CloudStorage.addProductImage(image);

      await ProductRequest.createProductRequest({
        product: {
          image: img,
          ...values,
          price: Number(values.price),
          srp_price: Number(values.srp_price),
        },
        type: Product.management_type.admin,
        from_management: false,
        vendor_id: vendorId,
        created_at: TimeStamp.now(),
      });

      setLoading(false);

      navigation.navigate('Pending');
    } catch (error) {
      console.log('Create Page', error);
    }
  };

  if (loading) return <Loader />;

  const priceValid = Yup.number()
    .positive()
    .required('Required')
    .integer()
    .test('no-leading-zero', 'Leading zero is not allowed', (_, context) => {
      return context.originalValue && !context.originalValue.startsWith('0');
    });

  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: '',
          price: '',
          srp_price: '',
          original_barcode: '',
          warehouse_info: '',
          specification: '',
          vendor_guarantee: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(200, 'Must be 200 characters or less')
            .required('Required'),
          price: priceValid,
          srp_price: priceValid,
        })}
        onSubmit={submitHandler}>
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <View style={s.layout}>
            <ProductPhoto {...{ image, cameraHandler, galleryHandler }} />
            <ProductName {...{ errors, touched, handleChange, handleBlur }} />
            <ProductInfo {...{ errors, touched, handleChange, handleBlur }} />
            <TextArea
              title="Product Specification"
              onChange={handleChange('specification')}
              onBlur={handleBlur}
            />
            <TextArea
              title="Vendor Guarantee"
              onChange={handleChange('vendor_guarantee')}
              onBlur={handleBlur}
            />
            {/* ProductWh = Product's warehouses */}
            <ProductWh {...{ warehouses, setWarehouses }} />
            <SubmitBtn {...{ handleSubmit }} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default Create;
