import { combineReducers } from 'redux';
import userReducer from './reducers.js/userReducer';
const rootReducer = combineReducers({
    user: userReducer
});
export default rootReducer;