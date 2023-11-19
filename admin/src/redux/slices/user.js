import { createSlice } from '@reduxjs/toolkit';
import UserAction from 'redux/thunks/userAction';

let initialState = {
  /**@type {import('services/models/user').default[]} */
  list: [],
  errors: null,
  status: null,
  showAddModal: false,
  isInitial: true,
  showDeleteModal: {
    visible: false,
    user_id: null,
    user_name: null,
  },
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAddModalToggle(state, { payload }) {
      state.showAddModal = payload || !state.showAddModal;
    },
    userDeleteModalToggle(state, { payload }) {
      state.showDeleteModal.visible =
        payload.visible || !state.showDeleteModal.visible;
      state.showDeleteModal.user_id = payload.user_id;
      state.showDeleteModal.user_name = payload.user_name;
    },
  },
  extraReducers: {
    [UserAction.fetchAdminsNStaffs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [UserAction.fetchAdminsNStaffs.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.list = payload;
      state.isInitial = false;
    },
    [UserAction.fetchAdminsNStaffs.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.errors = payload;
      state.isInitial = false;
    },
    [UserAction.addAdminsNStaffs.pending]: (state) => {
      state.status = 'loading';
    },
    [UserAction.addAdminsNStaffs.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.list.push(payload);
      state.showAddModal = false;
    },
    [UserAction.addAdminsNStaffs.rejected]: (state) => {
      state.status = 'error';
      state.showAddModal = false;
    },
  },
});

export const { userAddModalToggle, userDeleteModalToggle } = userSlice.actions;
export default userSlice.reducer;
