import {handleActions} from 'redux-actions';
import {clearOrderBook, updateOrderBook} from './../actions';
import {convertOrderBookData} from './../converter';

const initialState = {};

export const dataReducer = handleActions(
  {
    [updateOrderBook]: (state, action) => {
      const {key, data} = action.payload;
      return ({
        ...state,
        [key]: convertOrderBookData(state[key], data),
      });
    },
    [clearOrderBook]: (state, action) => {
      const {key} = action.payload;
      const newState = {...state};
      delete newState[key];
      return newState;
    }
  },
  initialState
);
