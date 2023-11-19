import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  pdrInitial: true,
  prrInitial: true,
  promoInitial: true,
};

const fbNoti = createSlice({
  name: 'FirebaseNotification',
  initialState,
  reducers: {
    pdrLoaded(state) {
      state.pdrInitial = false;
    },
    pdrUnmount(state) {
      state.pdrInitial = true;
    },
    prrLoaded(state) {
      state.prrInitial = false;
    },
    prrUnmount(state) {
      state.prrInitial = true;
    },
    promoLoaded(state) {
      state.promoInitial = false;
    },
    promoUnmount(state) {
      state.promoInitial = true;
    },
  },
});

export const {
  prrLoaded,
  pdrLoaded,
  pdrUnmount,
  prrUnmount,
  promoLoaded,
  promoUnmount,
} = fbNoti.actions;
export default fbNoti.reducer;
