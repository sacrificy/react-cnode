import { createStore, applyMiddleware, compose ,combineReducers} from 'redux';
import thunk from 'redux-thunk';

import { reducer as homeReducer } from '../containers/Home/store';
// import { reducer as detailReducer } from '../containers/Detail/store';
import { reducer as loginReducer } from '../containers/Login/store';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// detail: detailReducer,
const reducer = combineReducers({
  login: loginReducer,
  home: homeReducer,
});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
