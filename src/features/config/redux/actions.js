import {createAction} from 'redux-actions';

export const setWsState = createAction('CONFIG/SET_WS');

export const startSetWsState = (isEnabled) => (dispatch, getState, {wsApi}) => {
  if (!isEnabled) {
    wsApi.disconnect();
  } else {
    wsApi.connect();
  }
  dispatch(setWsState({isEnabled}));
};
