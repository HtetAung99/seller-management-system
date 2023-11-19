import { createAsyncThunk } from '@reduxjs/toolkit';
import Warehouse from 'services/models/warehouse';

export default class WarehouseAction {
  static fetchWarehouses = createAsyncThunk(
    'warehouses/fetchWarehouses',
    async () => {
      return await Warehouse.getWarehouses();
    }
  );

  static createWarehouses = createAsyncThunk(
    'warehouses/createWarehouse',
    async (name, { dispatch }) => {
      if (await Warehouse.warehouseAlreadyExists(name)) {
        throw new Error(`${name} already exists`);
      }
      await Warehouse.createWarehouse({ name });
      dispatch(this.fetchWarehouses());
    }
  );

  static deleteWarehouse = createAsyncThunk(
    'warehouses/deleteWarehouse',
    async (id, { dispatch }) => {
      await Warehouse.deleteWarehouse(id);
      dispatch(this.fetchWarehouses());
    }
  );
}
