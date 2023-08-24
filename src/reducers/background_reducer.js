import { handleActions } from 'redux-actions';

const reducers = {};

reducers.HANDLE_BACKGROUND_DATA = (state, { payload }) => {
  return {
    ...state,
    ...payload
  };
};

export default handleActions(reducers, {});
