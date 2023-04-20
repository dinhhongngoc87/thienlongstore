import { configureStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

const store = configureStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
