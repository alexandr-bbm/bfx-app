import {createAction} from 'redux-actions'
import {WsApi} from '../../../services/api/wsApi';

export const updateTrades = createAction('TRADES/UPDATE');
export const clearTrades = createAction('TRADES/CLEAR');

export const subscribeTrades = (symbol) => (dispatch, getState, {wsApi}) => {
  wsApi.subscribe(WsApi.ChannelName.Trades, {symbol}, (data, extraData) => {
    dispatch(updateTrades({symbol, data, extraData}))
  })
};

export const unsubscribeTrades = (symbol) => (dispatch, getState, {wsApi}) => {
  const unsubscribed = wsApi.unsubscribe(WsApi.ChannelName.Trades, {symbol});
  if (unsubscribed) {
    dispatch(clearTrades({symbol}))
  }
};
