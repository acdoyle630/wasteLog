/*jshint esversion: 6*/

export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';

export const loadCurrentUser = currentUser => {
  return {
    type : LOAD_CURRENT_USER,
    currentUser
  };
};