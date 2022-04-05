import { combineReducers } from 'redux';
import loginReducer from './user';
import carteiraReducer from './wallet';

const rootReducer = combineReducers(
  {
    user: loginReducer,
    wallet: carteiraReducer,
  },
);
export default rootReducer;
