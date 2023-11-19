import {
  pdrDetailChanges,
  pdrGbSelected,
  pdrRowSelected,
} from 'redux/slices/productRequest';
import { Role } from 'services/enums';
import ProductRequest from 'services/models/productRequest';
import ProductAction from './productAction';
import TrashAction from './trashAction';

export default class PdrAction {
  static moveToProduct = (id, product, record) => async (dispatch) => {
    try {
      await ProductRequest.moveToProduct(id, product, record);
      dispatch(ProductAction.fetchProducts());
      dispatch(pdrDetailChanges({}));
      dispatch(pdrGbSelected(null));
      dispatch(pdrRowSelected(null));
    } catch (error) {}
  };

  static moveToTrash = (id, product, record) => async (dispatch) => {
    try {
      await ProductRequest.moveToTrash(id, product, record);
      dispatch(TrashAction.fetchTrashs());
      dispatch(pdrDetailChanges({}));
      dispatch(pdrGbSelected(null));
      dispatch(pdrRowSelected(null));
    } catch (error) {}
  };

  static requestToAdmin = (id) => async (dispatch) => {
    try {
      await ProductRequest.requestToOtherRole(id, Role.management);
      dispatch(pdrDetailChanges({}));
      dispatch(pdrGbSelected(null));
      dispatch(pdrRowSelected(null));
    } catch (error) {}
  };

  static managementApprove = (id) => async (dispatch) => {
    try {
      await ProductRequest.managementApprove(id);
      dispatch(pdrDetailChanges({}));
      dispatch(pdrGbSelected(null));
      dispatch(pdrRowSelected(null));
    } catch (error) {}
  };
}
