/*jshint esversion: 6*/

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const loadCurrentUser = currentUser => {
  return {
    type : LOAD_CURRENT_USER,
    currentUser
  };
};

export const loadProducts = products => {
  console.log('hit load Product action')
  return {
    type : LOAD_PRODUCTS,
    products
  };
};

export const addProduct = product => {
  return {
    type : ADD_PRODUCT,
    product
  };
};