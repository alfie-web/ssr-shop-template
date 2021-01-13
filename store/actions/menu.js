import { MENU_SET_FIRST_LEVEL_ITEMS, MENU_SET_CHILDREN } from '../types';
import { categoriesAPI } from '../../api';

const menuActions = {
	setFirstLevelItems: (items) => ({
		type: MENU_SET_FIRST_LEVEL_ITEMS,
		payload: items
	}),

	setChildren: (items, parent) => ({
		type: MENU_SET_CHILDREN,
		payload: { items, parent }
	}),


	fetchFirstLevelItems: () => async dispatch => {
		try {
			const { data } = await categoriesAPI.getFirstLevel();

			console.log(data)
			dispatch(menuActions.setFirstLevelItems(data.data));

		} catch (e) {
			console.log(e)
		}
	},

	fetchByParent: (parentId) => async (dispatch, getState) => {
		const { menu: { items } } = getState();
		// console.log(items)
		const finded = items.find(item => item._id === parentId && item.children)
		if (finded && finded.children) return

		try {
			const { data } = await categoriesAPI.getByParent(parentId);

			console.log('data', data)
			dispatch(menuActions.setChildren(data.data, parentId));

		} catch (e) {

		}
	}
}

export default menuActions;