import { combineReducers } from 'redux';

import goodsReducer from './goods';

const rootReducer = combineReducers({
	goods: goodsReducer
})

export default rootReducer;