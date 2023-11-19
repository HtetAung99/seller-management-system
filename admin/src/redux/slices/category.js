import { createSlice } from '@reduxjs/toolkit';
import CategoryAction from 'redux/thunks/categoryAction';
import { sortAlphabet } from 'utils';

let initialState = {
  /**@type {import('services/models/vendor.js').default[]} */
  categories: [],
  isInitial: true,
  errors: null,
  status: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [CategoryAction.fetchCategories.pending]: (state, action) => {
      state.status = 'loading';
    },
    [CategoryAction.fetchCategories.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.categories = payload.sort(sortAlphabet);
      state.isInitial = false;
    },
    [CategoryAction.fetchCategories.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.errors = payload;
      state.isInitial = false;
    },
  },
});

export default categoriesSlice.reducer;
