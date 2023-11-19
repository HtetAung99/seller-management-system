import { createSlice } from '@reduxjs/toolkit';
import ProductAction from 'redux/thunks/productAction';

let initialState = {
  /**@type {import('services/models/product').default[]} */
  products: [],
  errors: null,
  status: null,
  isInitial: true,
  product: {},
  selectedRowIndex: null,
  showProductDeleteModal: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productDetailChanges(state, { payload }) {
      state.product = payload;
    },
    productRowSelected(state, { payload }) {
      state.selectedRowIndex = payload;
    },
    productDeleteModalToggle(state, { payload }) {
      state.showProductDeleteModal = payload || !state.showProductDeleteModal;
    },
  },
  extraReducers: {
    [ProductAction.fetchProducts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [ProductAction.fetchProducts.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.isInitial = false;
      state.products = payload;
    },
    [ProductAction.fetchProducts.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.errors = payload;
      state.isInitial = false;
    },
  },
});

export const {
  productDetailChanges,
  productRowSelected,
  productDeleteModalToggle,
} = productSlice.actions;
export default productSlice.reducer;
