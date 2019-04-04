import {createAction} from 'redux-actions'
import {WsApi} from '../../../services/api/wsApi';

export const updateTicker = createAction('TICKER/UPDATE');
export const clearTicker = createAction('TICKER/CLEAR');

export const subscribeTicker = (symbol) => (dispatch, getState, {wsApi}) => {
  wsApi.subscribe(WsApi.ChannelName.Ticker, {symbol}, (data) => {
    dispatch(updateTicker({symbol, data}))
  })
};

export const unsubscribeTicker = (symbol) => (dispatch, getState, {wsApi}) => {
  const unsubscribed = wsApi.unsubscribe(WsApi.ChannelName.Ticker, {symbol});
  if (unsubscribed) {
    dispatch(clearTicker({symbol}))
  }
};
