import { createSlice } from '@reduxjs/toolkit';
import WarehouseAction from 'redux/thunks/warehouseAction';
import { sortAlphabet } from 'utils';

let initialState = {
  /**@type {import('services/models/vendor.js').default[]} */
  warehouses: [],
  isInitial: true,
  errors: null,
  status: null,
};

const warehousesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [WarehouseAction.fetchWarehouses.pending]: (state, action) => {
      state.status = 'loading';
    },
    [WarehouseAction.fetchWarehouses.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.warehouses = payload.sort(sortAlphabet);
      state.isInitial = false;
    },
    [WarehouseAction.fetchWarehouses.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.errors = payload;
      state.isInitial = false;
    },
  },
});

export default warehousesSlice.reducer;
