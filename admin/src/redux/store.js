import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import authReducer from 'redux/slices/auth';
import notiReducer from 'redux/slices/firebaseNoti';
import pdrReducer from 'redux/slices/productRequest';
import prrReducer from 'redux/slices/priceRequest';
import promoReducer from 'redux/slices/promotion';
import vendorsReducer from 'redux/slices/vendor';
import categoriesReducer from 'redux/slices/category';
import warehousesReducer from 'redux/slices/warehouse';
import productsReducer from 'redux/slices/product';
import trashsReducer from 'redux/slices/trash';
import usersReducer from 'redux/slices/user';

const rootReducer = combineReducers({
  auth: authReducer,
  noti: notiReducer,
  pdr: pdrReducer,
  prr: prrReducer,
  promo: promoReducer,
  vendors: vendorsReducer,
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,
  trashs: trashsReducer,
  warehouses: warehousesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
