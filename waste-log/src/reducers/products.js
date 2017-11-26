/*jshint esversion: 6*/
import {
  LOAD_PRODUCTS,
} from '../action';

const initialState = {
  productArray : []
};

const products = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_PRODUCTS:

      return [...action.products];

      default : return state;
    }
};


export default products;