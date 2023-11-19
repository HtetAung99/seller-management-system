import { createSlice } from '@reduxjs/toolkit';
import VendorAction from 'redux/thunks/vendorAction';

let initialState = {
  /**@type {import('services/models/vendor.js').default[]} */
  vendors: [],
  status: null,
  showAddModal: false,
  showDeleteModal: {
    visible: false,
    vendor_id: null,
    vendor_name: null,
  },
  isInitial: true,
};

const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    vendorAddModalToggle(state, { payload }) {
      state.showAddModal = payload || !state.showAddModal;
    },
    vendorDeleteModalToggle(state, { payload }) {
      state.showDeleteModal.visible =
        payload.visible || !state.showDeleteModal.visible;
      state.showDeleteModal.vendor_id = payload.vendor_id;
      state.showDeleteModal.vendor_name = payload.vendor_name;
    },
  },
  extraReducers: {
    [VendorAction.fetchVendors.pending]: (state, action) => {
      state.status = 'loading';
    },
    [VendorAction.fetchVendors.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.vendors = payload;
      state.isInitial = false;
    },
    [VendorAction.fetchVendors.rejected]: (state) => {
      state.status = 'error';
      state.isInitial = false;
    },
    [VendorAction.addVendor.pending]: (state) => {
      state.status = 'loading';
    },
    [VendorAction.addVendor.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.vendors.push(payload);
      state.showAddModal = false;
    },
    [VendorAction.addVendor.rejected]: (state) => {
      state.status = 'error';
      state.showAddModal = false;
    },
  },
});

export const { vendorAddModalToggle, vendorDeleteModalToggle } =
  vendorsSlice.actions;
export default vendorsSlice.reducer;
