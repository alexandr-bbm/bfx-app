import {combineReducers} from 'redux'
import {dataReducer} from './data';

export const orderBookReducer = combineReducers({
  data: dataReducer,
});
