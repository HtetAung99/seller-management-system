import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import s from './styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PriceRequest } from '../../models/priceRequest';
import { AuthContext } from '../../AuthProvider';
import { TimeStamp } from '../../models/helper';
import { Product } from '../../models/product';
import { ModalContent } from './modal-content';

export default EditPriceBtn = ({ productId, price, isNotProduct }) => {
  const { vendorId } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [isPrrPending, setIsPrrPending] = useState(false);

  useEffect(() => {
    const checkPrrPending = async () => {
      if (productId) {
        setIsPrrPending(await PriceRequest.priceRequestExists(productId));
      }
    };

    checkPrrPending();
  }, [setIsPrrPending, productId]);

  const formik = useFormik({
    initialValues: {
      priceInput: price,
    },
    onSubmit: async values => {
      try {
        await PriceRequest.createPriceRequest({
          previous_price: price,
          price_requested: values.priceInput,
          product_id: productId,
          vendor_id: vendorId,
          type: Product.management_type.admin,
          created_at: TimeStamp.now(),
        });

        setModalVisible(!modalVisible);
        setIsPrrPending(true);
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: Yup.object().shape({
      priceInput: Yup.number().required().positive(),
    }),
  });

  return (
    <View style={s['edit-btn-ctn']}>
      <View style={s['price-edit-btn']}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Price</Text>
          <Text style={s.price}>{price} MMK</Text>
        </View>
        <ModalContent
          {...{
            modalVisible,
            setModalVisible,
            reset: formik.handleReset,
            priceInput: formik.values.priceInput,
            errorPrice: formik.errors.priceInput,
            setFieldValue: formik.setFieldValue,
            handleSubmit: formik.handleSubmit,
            dirty: formik.dirty,
          }}
        />
        {!isNotProduct && (
          <Pressable
            style={[
              s.btn,
              { backgroundColor: isPrrPending ? '#ccc' : '#434242' },
            ]}
            disabled={isPrrPending}
            onPress={() => setModalVisible(true)}>
            <Text style={s['btn-text']}>
              {isPrrPending ? 'Pending' : 'Edit'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
