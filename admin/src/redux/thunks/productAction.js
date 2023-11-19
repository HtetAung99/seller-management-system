import { createAsyncThunk } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { productDetailChanges, productRowSelected } from 'redux/slices/product';
import { HistoryStatus, HistoryType, TrashStatus } from 'services/enums';
import History from 'services/models/history';
import Product from 'services/models/product';
import Trash from 'services/models/trash';
import { processData } from './helpers';
import TrashAction from './trashAction';

export default class ProductAction {
  static fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { dispatch, getState }) => {
      const productsFromAPI = await Product.getProducts();
      const linkProducts = processData(getState(), dispatch);

      return await linkProducts(productsFromAPI);
    }
  );

  static deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { dispatch }) => {
      await Product.deleteProduct(id);
      dispatch(this.fetchProducts());
    }
  );

  static updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, update }, { dispatch }) => {
      await Product.updateProduct(id, update);
      dispatch(this.fetchProducts());
    }
  );

  static getProductsByBarcode = createAsyncThunk(
    'products/getProductsByBarcode',
    async (barcode, { dispatch, getState }) => {
      const productsFromAPI = await Product.getProductsByBarcode(barcode);
      const linkProducts = processData(getState(), dispatch);

      return await linkProducts(productsFromAPI);
    }
  );

  static moveToTrash = (drawerData) => async (dispatch) => {
    try {
      const { vendor_id, id } = drawerData.product;
      const product = await Product.getProductById(id);
      const { id: _, ...newTrash } = new Trash({
        ...product,
        vendor_id,
        status: TrashStatus.discontinued,
        created_at: Timestamp.now(),
      });

      const { id: __, ...newHistory } = new History({
        type: HistoryType.product,
        status: HistoryStatus.reject,
        vendor_id,
        user_id: drawerData.user_id,
        created_at: Timestamp.now(),
      });
      await Product.moveToTrash(id, newTrash, newHistory);
      dispatch(TrashAction.fetchTrashs());
      dispatch(this.fetchProducts());
      dispatch(productDetailChanges({}));
      dispatch(productRowSelected(null));
    } catch (error) {}
  };
}
