/*jshint esversion: 6*/

import {combineReducers} from 'redux';

import currentUser from './currentUser';
import products from './products';

export default combineReducers({
  currentUser,
  products
});
