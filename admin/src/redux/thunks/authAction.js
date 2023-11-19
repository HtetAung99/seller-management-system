import {
  loginFailure,
  loginLoading,
  loginSuccess,
  logoutUser,
} from 'redux/slices/auth';
import { prrDataChanges, prrDetailChanges } from 'redux/slices/priceRequest';
import { pdrDataChanges, pdrDetailChanges } from 'redux/slices/productRequest';
import AuthService from 'services/auth';
import { showError } from 'utils';

export default class AuthAction {
  static login =
    ({ email, password }) =>
    async (dispatch) => {
      dispatch(loginLoading());
      try {
        const result = await AuthService.loginUser(email, password);

        dispatch(loginSuccess({ ...result }));
      } catch (e) {
        console.log(e);
        showError('Invalid Credentials');
        dispatch(loginFailure());
      }
    };

  static logout = () => async (dispatch) => {
    await AuthService.logoutUser();

    // cleanup
    dispatch(pdrDataChanges([]));
    dispatch(prrDataChanges([]));
    dispatch(pdrDetailChanges({}));
    dispatch(prrDetailChanges({}));

    dispatch(logoutUser());
  };

  static rehydrate = () => async (dispatch) => {
    try {
      const user = await AuthService.currentUser();
      dispatch(loginSuccess({ ...user }));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
}
