import { combineReducers } from 'redux';
import uiReducer from './ui';
import dataReducer from './data';
import routeReducer from './route';

export default combineReducers({
  route: routeReducer,
  ui: uiReducer,
  data: dataReducer
});


