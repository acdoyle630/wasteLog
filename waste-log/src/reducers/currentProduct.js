/*jshint esversion: 6*/
import {
  LOAD_CURRENT_PRODUCT
} from '../action';

const initialState = '';

const currentProduct = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CURRENT_PRODUCT:

      return action.currentProduct;

      default: return state;
  }
};


export default currentProduct;