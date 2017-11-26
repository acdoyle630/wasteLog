/*jshint esversion: 6*/

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadCurrentUser = currentUser => {
  return {
    type : LOAD_CURRENT_USER,
    currentUser
  };
};

export const loadProducts = products => {
  return {
    type : LOAD_PRODUCTS,
    products
  };
};

