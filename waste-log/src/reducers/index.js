/*jshint esversion: 6*/

import {combineReducers} from 'redux';

import currentUser from './currentUser';
import products from './products';
import currentProduct from './currentProduct';

export default combineReducers({
  currentUser,
  products,
  currentProduct
});
