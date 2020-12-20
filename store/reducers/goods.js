import {
	GOODS_SET_IS_FETCHING,
	GOODS_SET_ITEMS,
	GOODS_SET_CURRENT,
	GOODS_ADD_ITEMS
} from '../types';

const initialState = {
	isFetching: false,
	items: [],
	current: null
}

const goodsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GOODS_SET_IS_FETCHING:
			return {
				...state,
				isFetching: payload
			}

		case GOODS_SET_ITEMS:
			return {
				...state,
				items: payload
			}

		case GOODS_SET_CURRENT:
			return {
				...state,
				current: payload
			}

		case GOODS_ADD_ITEMS:
			return {
				...state,
				items: [
					...state.items,
					...payload
				]
			}

		default: return state;
	}
}

export default goodsReducer;