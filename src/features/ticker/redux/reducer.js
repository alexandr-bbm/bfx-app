import {handleActions} from 'redux-actions';
import {clearTicker, updateTicker} from './actions';
import {convertTickerData} from './converter';

const initialState = {};

export const tickerReducer = handleActions(
  {
    [updateTicker]: (state, action) => {
      const {symbol, data} = action.payload;
      return ({
        ...state,
        [symbol]: convertTickerData(data),
      });
    },
    [clearTicker]: (state, action) => {
      const {symbol} = action.payload;
      const newState = {...state};
      delete newState[symbol];
      return newState;
    }
  },
  initialState
);
