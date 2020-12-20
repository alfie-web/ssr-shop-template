import { combineReducers } from 'redux';

import goodsReducer from './goods';
import cartReducer from './cart';

const rootReducer = combineReducers({
	goods: goodsReducer,
	cart: cartReducer,
})

export default rootReducer;