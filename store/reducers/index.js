import { combineReducers } from 'redux';

import goodsReducer from './goods';
import cartReducer from './cart';
import menuReducer from './menu';

const rootReducer = combineReducers({
	goods: goodsReducer,
	cart: cartReducer,
	menu: menuReducer
})

export default rootReducer;