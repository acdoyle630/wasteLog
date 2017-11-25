/*jshint esversion: 6*/
import {
  LOAD_CURRENT_USER
} from '../action';

const initialState = '';

const currentUser = (state = initialState, action) =>{
  switch(action.type){
    case LOAD_CURRENT_USER:

      return action.currentUser;

      default: return state;
  }
};


export default currentUser;