import { combineReducers } from 'redux';

import { forecast } from './forecast';

export const rootReducer = combineReducers({
  forecast,
});
