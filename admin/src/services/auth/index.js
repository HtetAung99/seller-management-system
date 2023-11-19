import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import store from 'redux/store';
import User from 'services/models/user';
import { assignJWT, showMessage } from 'utils';
import api from 'utils/api';
import { Role } from '../enums';

export default class AuthService {
  static auth = getAuth();

  /**
   * @param {string} email
   * @param {string} password
   * @param {string} displayName
   * @param {Role} role
   */
  static addUser = async (email, password, displayName, role) => {
    try {
      if (!Role[role]) {
        throw new Error('Incorrect Role');
      }

      const { user } = await this.createAuthAccount(email, password);

      await User.createUser({
        uid: user.uid,
        active_status: true,
        display_name: displayName,
        role,
        email,
      });
    } catch (error) {
      console.log('auth create error', error);
      showMessage('error', "Can't Create User", 'User Auth');
    }
  };

  static currentUser = async () => {
    const { uid } = this.auth.currentUser;
    const result = await User.getUserByAuthId(uid);
    return result;
  };

  static loginUser = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const result = await User.getUserByAuthId(user.uid);
    return result;
  };

  static logoutUser = async () => {
    await this.auth.signOut();
  };

  static createAuthAccount = async (email, password) =>
    new Promise(async (resolve, reject) => {
      try {
        const { id: uid } = store.getState().auth;
        const token = await assignJWT({ uid, email });

        const res = await api
          .post('auth', {
            json: { email, password },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json();

        resolve(res);
      } catch (error) {
        const res = await error?.response?.json();
        const errorText = res?.code || 'Create Auth Error';
        reject(errorText);
      }
    });
}
