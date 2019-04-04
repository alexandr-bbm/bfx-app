import {combineReducers} from 'redux';
import {tickerReducer} from '../features/ticker/redux/reducer';
import {orderBookReducer} from '../features/orderBook/redux/reducers';
import {tradesReducer} from '../features/trades/redux/reducer';
import {configReducer} from '../features/config/redux/reducer';

export const rootReducer = combineReducers({
  ticker: tickerReducer,
  orderBook: orderBookReducer,
  trades: tradesReducer,
  config: configReducer,
});
