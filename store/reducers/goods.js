import {
	GOODS_SET_IS_FETCHING,
	GOODS_SET_ITEMS,
	GOODS_SET_CURRENT,
	GOODS_ADD_ITEMS
} from '../types';

const initialState = {
	isFetching: false,

	items: [],
	hasNextPage: false,
	totalDocs: 0,
	currentPage: 0,
	totalPages: 0,

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
				items: payload.items,
				hasNextPage: payload.hasNextPage,
				totalDocs: payload.totalDocs,
				currentPage: payload.currentPage,
				totalPages: payload.totalPages,
				isFetching: false,
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