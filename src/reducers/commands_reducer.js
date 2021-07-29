import { handleActions } from 'redux-actions';

const reducers = {};

reducers.UPDATE_COMMAND_STATE = (state, { payload }) => {
  return payload;
};

export default handleActions(reducers, {});
