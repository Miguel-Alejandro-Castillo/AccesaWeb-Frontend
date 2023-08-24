import { combineReducers } from 'redux';
import commands from './commands_reducer';
import background from './background_reducer';

export default combineReducers({background, commands});
