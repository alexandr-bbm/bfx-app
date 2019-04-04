import {createAction} from 'redux-actions'
import {batchActions} from 'redux-batched-actions'
import {WsApi} from '../../../services/api/wsApi';

export const updateOrderBook = createAction('OrderBook/UPDATE');
export const clearOrderBook = createAction('OrderBook/CLEAR');

export const subscribeOrderBook = (params) => (dispatch, getState, {wsApi}) => {
  const key = WsApi.paramsToString(params);
  const actionsBuffer = [];
  wsApi.subscribe(WsApi.ChannelName.Book, params, (data) => actionsBuffer.push(updateOrderBook({key, data})));

  setInterval(() => {
    dispatch(batchActions(actionsBuffer));
    actionsBuffer.length = 0;
  }, 100)
};

export const unsubscribeOrderBook = (params) => (dispatch, getState, {wsApi}) => {
  const unsubscribed = wsApi.unsubscribe(WsApi.ChannelName.Book, params);
  if (unsubscribed) {
    dispatch(clearOrderBook(params))
  }
};
