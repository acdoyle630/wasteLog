/*jshint esversion: 6*/
import {
  LOAD_PRODUCTS,
  ADD_PRODUCT
} from '../action';

const initialState = [];

const products = (state = initialState, action) =>{
  console.log('hit load product reducer');
  console.log(action.products);
  switch(action.type){
    case LOAD_PRODUCTS:

      return [...action.products];

      default: return state;
    }
};


export default products;