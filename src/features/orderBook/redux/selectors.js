import {WsApi} from '../../../services/api/wsApi';

export const selectOrderBookData = state => state.orderBook.data;

export const selectSpecificOrderBook = (state, params) => {
  const key = WsApi.paramsToString(params);
  return selectOrderBookData(state)[key];
};
