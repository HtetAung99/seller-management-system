import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  /**@type {import('services/models/productRequest').default[]} */
  pdrList: [],
  /**@type {import('services/models/productRequest').default} */
  pdr: {},
  showApproveModal: false,
  showReportModal: false,
  showRejectModal: false,
  showProductCheckModal: false,
  userActionOnPdr: null,
  selectedRowIndex: null,
  selectedGbIndex: null,
};

const pdrSlice = createSlice({
  name: 'ProductRequest',
  initialState,
  reducers: {
    pdrDataChanges(state, { payload }) {
      state.pdrList = payload;
    },
    pdrDetailChanges(state, { payload }) {
      state.pdr = payload;
    },
    pdrApproveModalToggle(state, { payload }) {
      state.showApproveModal = payload || !state.showApproveModal;
    },
    pdrReportModalToggle(state, { payload }) {
      state.showReportModal = payload || !state.showReportModal;
    },
    pdrRejectModalToggle(state, { payload }) {
      state.showRejectModal = payload || !state.showRejectModal;
    },
    productCheckModalToggle(state, { payload }) {
      state.showProductCheckModal = payload || !state.showProductCheckModal;
    },
    pdrUserActionUpdate(state, { payload }) {
      state.userActionOnPdr = payload;
    },
    pdrRowSelected(state, { payload }) {
      state.selectedRowIndex = payload;
    },
    pdrGbSelected(state, { payload }) {
      state.selectedGbIndex = payload;
    },
  },
});

export const {
  pdrDataChanges,
  pdrDetailChanges,
  pdrApproveModalToggle,
  pdrReportModalToggle,
  pdrRejectModalToggle,
  pdrUserActionUpdate,
  productCheckModalToggle,
  pdrRowSelected,
  pdrGbSelected,
} = pdrSlice.actions;
export default pdrSlice.reducer;
