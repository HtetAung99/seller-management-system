import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/auth';
import User from 'services/models/user';

export default class UserAction {
  static fetchAdminsNStaffs = createAsyncThunk('users/fetchUsers', async () => {
    return await User.getAdminsNStaffs();
  });

  static addAdminsNStaffs = createAsyncThunk('users/addUsers', async (data) => {
    const { uid } = await AuthService.createAuthAccount(
      data.email,
      data.password
    );
    if (await User.userAlreadyExists(data.email)) {
      throw new Error('User already exists');
    }

    const { id, ...newUser } = new User({
      ...data,
      display_name: data.name,
      active_status: true,
    });
    return await User.createUser(uid, newUser);
  });

  static updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, update }, { dispatch }) => {
      await User.updateUser(id, update);
      dispatch(this.fetchAdminsNStaffs());
    }
  );

  static deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, { dispatch }) => {
      await User.deleteUser(id);
      dispatch(this.fetchAdminsNStaffs());
    }
  );

  static blockUser = createAsyncThunk(
    'users/blockUser',
    async (id, { dispatch }) => {
      await User.updateUser(id, { active_status: false });
      dispatch(this.fetchAdminsNStaffs());
    }
  );

  static unBlockUser = createAsyncThunk(
    'users/unBlockUser',
    async (id, { dispatch }) => {
      await User.updateUser(id, { active_status: true });
      dispatch(this.fetchAdminsNStaffs());
    }
  );
}
