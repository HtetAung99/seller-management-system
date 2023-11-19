const { createSlice } = require('@reduxjs/toolkit');

let initialState = {
  /**@type {import('services/models/priceRequest').default[]} */
  prrList: [],
  /**@type {import('services/models/priceRequest').default} */
  prr: {},
  showApproveModal: false,
  showReportModal: false,
  showRejectModal: false,
  selectedRowIndex: null,
  selectedGbIndex: null,
};

const prrSlice = createSlice({
  name: 'PriceRequest',
  initialState,
  reducers: {
    prrDataChanges(state, { payload }) {
      state.prrList = payload;
    },
    prrDetailChanges(state, { payload }) {
      state.prr = payload;
    },
    prrApproveModalToggle(state, { payload }) {
      state.showApproveModal = payload || !state.showApproveModal;
    },
    prrReportModalToggle(state, { payload }) {
      state.showReportModal = payload || !state.showReportModal;
    },
    prrRejectModalToggle(state, { payload }) {
      state.showRejectModal = payload || !state.showRejectModal;
    },
    prrRowSelected(state, { payload }) {
      state.selectedRowIndex = payload;
    },
    prrGbSelected(state, { payload }) {
      state.selectedGbIndex = payload;
    },
  },
});

export const {
  prrDataChanges,
  prrDetailChanges,
  prrApproveModalToggle,
  prrReportModalToggle,
  prrRejectModalToggle,
  prrRowSelected,
  prrGbSelected,
} = prrSlice.actions;
export default prrSlice.reducer;
