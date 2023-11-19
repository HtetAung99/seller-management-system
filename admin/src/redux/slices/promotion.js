import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  /**@type {import('services/models/promotion').default[]} */
  promoList: [],
};

const promoSlice = createSlice({
  name: 'ProductRequest',
  initialState,
  reducers: {
    promoDataChanges(state, { payload }) {
      state.promoList = payload;
    },
  },
});

export const { promoDataChanges } = promoSlice.actions;
export default promoSlice.reducer;
