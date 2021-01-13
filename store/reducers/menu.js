import { MENU_SET_FIRST_LEVEL_ITEMS, MENU_SET_CHILDREN } from '../types';

const initialState = {
	items: []
}

const menuReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case MENU_SET_FIRST_LEVEL_ITEMS:
			return {
				...state,
				items: payload
			}

		case MENU_SET_CHILDREN:
			return {
				...state,
				items: state.items.map(item => {
					if (item._id === payload.parent) {
						console.log('Yesssss', payload.items)
						return {
							...item,
							children: payload.items
						}
					}
					return item
				})
			}

		default: return state
	}
}

export default menuReducer;