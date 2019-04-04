import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {enableBatching} from 'redux-batched-actions'

import {rootReducer} from './rootReducer';
import {WsApi} from '../services/api/wsApi';

export function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const wsApi = new WsApi();

  const middleware = [
    thunk.withExtraArgument({
      wsApi: wsApi,
    })
  ];
  return createStore(
    enableBatching(rootReducer),
    composeEnhancers(applyMiddleware(...middleware))
  );
}