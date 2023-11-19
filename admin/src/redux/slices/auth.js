import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isLoggedIn: false,
  isActive: false,
  loading: true,
  id: '',
  uid: '',
  role: null,
  display_name: null,
};

const authSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    loginSuccess(state, { payload }) {
      state.isLoggedIn = true;
      state.isActive = payload.active_status;
      state.id = payload.id;
      state.uid = payload.uid;
      state.role = payload.role;
      state.loading = false;
      state.display_name = payload.display_name;
    },
    loginFailure(state) {
      state.isLoggedIn = false;
      state.isActive = false;
      state.loading = false;
    },

    logoutUser(state) {
      state.isLoggedIn = false;
      state.id = '';
      state.uid = '';
      state.role = null;
      state.isActive = false;
      state.loading = false;
      state.display_name = null;
    },
    updateStatus(state, { payload }) {
      state.isActive = payload;
    },
    loginLoading(state) {
      state.loading = true;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logoutUser,
  updateStatus,
  loginLoading,
} = authSlice.actions;
export default authSlice.reducer;
