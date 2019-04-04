import {handleActions} from 'redux-actions';
import {clearTrades, updateTrades} from './actions';
import {convertTradesData} from './converter';

const initialState = {};

export const tradesReducer = handleActions(
  {
    [updateTrades]: (state, action) => {
      const {symbol, data, extraData} = action.payload;
      return ({
        ...state,
        [symbol]: convertTradesData(state[symbol], data, extraData),
      });
    },
    [clearTrades]: (state, action) => {
      const {symbol} = action.payload;
      const newState = {...state};
      delete newState[symbol];
      return newState;
    }
  },
  initialState
);
