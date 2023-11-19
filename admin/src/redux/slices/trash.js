import { createSlice } from '@reduxjs/toolkit';
import TrashAction from 'redux/thunks/trashAction';

let initialState = {
  /**@type {import('services/models/trash').default[]} */
  trashs: [],
  errors: null,
  status: null,
  trash: {},
  selectedRowIndex: null,
  showReportDeleteModal: false,
};

const trashSlice = createSlice({
  name: 'trashs',
  initialState,
  reducers: {
    trashDetailChanges(state, { payload }) {
      state.trash = payload;
    },
    trashRowSelected(state, { payload }) {
      state.selectedRowIndex = payload;
    },
    reportDeleteModalToggle(state, { payload }) {
      state.showReportDeleteModal = payload || !state.showReportDeleteModal;
    },
  },
  extraReducers: {
    [TrashAction.fetchTrashs.pending]: (state, action) => {
      state.status = 'loading';
    },
    [TrashAction.fetchTrashs.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.trashs = payload;
    },
    [TrashAction.fetchTrashs.rejected]: (state, { payload }) => {
      state.status = 'error';
      state.errors = payload;
    },
  },
});

export const { trashDetailChanges, trashRowSelected, reportDeleteModalToggle } =
  trashSlice.actions;
export default trashSlice.reducer;
