import { createAsyncThunk } from '@reduxjs/toolkit';
import Category from 'services/models/category';
import Product from 'services/models/product';

export default class CategoryAction {
  static fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
      return await Category.getCategories();
    }
  );

  static createCategory = createAsyncThunk(
    'categories/createCategory',
    async (name, { dispatch }) => {
      if (await Category.categoryAlreadyExists(name)) {
        throw new Error(`${name} already exists`);
      }
      await Category.createCategory({ name });
      dispatch(this.fetchCategories());
    }
  );

  static deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id, { dispatch }) => {
      if (await Product.productsExistByCategoryId(id)) {
        throw new Error('Some products still exist in this category.');
      }
      await Category.deleteCategory(id);
      dispatch(this.fetchCategories());
    }
  );
}
