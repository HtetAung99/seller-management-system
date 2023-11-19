import {
  prrDetailChanges,
  prrGbSelected,
  prrRowSelected,
} from 'redux/slices/priceRequest';
import { Role } from 'services/enums';
import History from 'services/models/history';
import PriceRequest from 'services/models/priceRequest';
import ProductAction from './productAction';

export default class PrrAction {
  static moveToProduct = (prr, record) => async (dispatch) => {
    try {
      await PriceRequest.moveToProduct(prr, record);
      dispatch(prrDetailChanges({}));
      dispatch(prrRowSelected(null));
      dispatch(prrGbSelected(null));
      dispatch(ProductAction.fetchProducts());
    } catch (error) {}
  };

  static requestToAdmin = (id) => async (dispatch) => {
    try {
      await PriceRequest.requestToOtherRole(id, Role.management);
      dispatch(prrDetailChanges({}));
      dispatch(prrGbSelected(null));
      dispatch(prrRowSelected(null));
    } catch (error) {}
  };

  static managementApprove = (id) => async (dispatch) => {
    try {
      await PriceRequest.managementApprove(id);
      dispatch(prrDetailChanges({}));
      dispatch(prrGbSelected(null));
      dispatch(prrRowSelected(null));
    } catch (error) {}
  };

  static reject = (prr, record) => async (dispatch) => {
    try {
      await PriceRequest.rejectRequest(prr, record);
      dispatch(prrDetailChanges({}));
      dispatch(prrGbSelected(null));
      dispatch(prrRowSelected(null));
    } catch (error) {}
  };
}
