import { combineReducers } from 'redux';

import authUser from './authUser';
import question from './question';
import board from './board';

export default combineReducers({
    authUser,
    question,
    board
});
