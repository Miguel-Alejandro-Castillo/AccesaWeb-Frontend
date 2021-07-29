import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import log from 'loglevel';

const storeEnhancers = [];
const combinedCreateStore = compose(...storeEnhancers)(createStore);
const middlewares = [thunk];

if (process.env.DEVTOOLS) {
  middlewares.push(require('./middleware/logger'));
  log.enableAll();
} else {
  log.disableAll();
}

const finalCreateStore = applyMiddleware(...middlewares)(combinedCreateStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
