import {handleActions} from 'redux-actions';
import {setWsState} from './actions';

const initialState = {
  wsEnabled: true,
};

export const configReducer = handleActions(
  {
    [setWsState]: (state, action) => ({
      ...state,
      wsEnabled: action.payload.isEnabled,
    }),
  },
  initialState
);
