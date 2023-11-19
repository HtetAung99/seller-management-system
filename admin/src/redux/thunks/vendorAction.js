import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'services/auth';
import Product from 'services/models/product';
import Vendor from 'services/models/vendor';

export default class VendorAction {
  static fetchVendors = createAsyncThunk('vendors/fetchVendors', async () => {
    return await Vendor.getVendors();
  });

  static addVendor = createAsyncThunk('vendors/addVendor', async (data) => {
    const { uid } = await AuthService.createAuthAccount(
      data.email,
      // Google sign-in overrides auth method. So, this password becomes useless.
      'thisisauselesspassword'
    );
    if (await Vendor.vendorAlreadyExists(data.email)) {
      throw new Error('Vendor already exists');
    }

    return await Vendor.createVendor(uid, data);
  });

  static updateVendor = createAsyncThunk(
    'vendors/updateVendor',
    async ({ id, update }, { dispatch }) => {
      await Vendor.updateVendor(id, update);
      dispatch(this.fetchVendors());
    }
  );

  static deleteVendor = createAsyncThunk(
    'vendors/deleteVendor',
    async (id, { dispatch }) => {
      if (await Product.productsExistByVendorId(id)) {
        throw new Error('Products owned by this vendor still exist.');
      }
      await Vendor.deleteVendor(id);
      dispatch(this.fetchVendors());
    }
  );

  static blockVendor = createAsyncThunk(
    'vendors/blockVendor',
    async (id, { dispatch }) => {
      await Vendor.updateVendor(id, { active: false });
      dispatch(this.fetchVendors());
    }
  );

  static unBlockVendor = createAsyncThunk(
    'vendors/unBlockVendor',
    async (id, { dispatch }) => {
      await Vendor.updateVendor(id, { active: true });
      dispatch(this.fetchVendors());
    }
  );
}
