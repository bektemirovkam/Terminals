import { combineReducers } from "redux";
import { terminalsReducer } from './ducks/terminals/terminalsReducer';
import { userReducer } from './ducks/user/userReducer';

export const rootReducer = combineReducers({
    terminals: terminalsReducer,
    user: userReducer
});


