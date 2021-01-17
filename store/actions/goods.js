import LocalStorage from '../../helpers/LocalStorage';
import { GOODS_SET_ITEMS } from '../types'
import goodsAPI from '../../api/goods'

const goodsActions = {
	setGoods: ({ goods, page, hasNextPage, totalDocs, totalPages }) => ({
		type: GOODS_SET_ITEMS,
		payload: {
			items: goods,
			currentPage: +page,
			totalPages,
			hasNextPage,
			totalDocs
		}
	}),

	fetchGoods: () => async dispatch => {
		const { data } = await goodsAPI.getAll(page)

		return dispatch(goodsActions.setGoods(data.data))
	},





	// addGoodToCart: good => dispatch => {
	addGoodToCart: good => {
		const plus = good.quantity ? good.quantity : 1;
		good = {
			...good,
			quantity: plus
		}

		console.log('good', good)

		// А вообще конечно вопрос, нужно ли хранить в store?
		// TODO: Установить какой-то лимит по одинарному заказу
		// TODO: Очищать, когда заказ оформлен
		// dispatch(cartActions.addGood(good));

		const cart = LocalStorage.get('SHOP_CART') || [];
		const findedIndex = cart.findIndex(item => item._id === good._id && item.size === good.size);

		console.log(findedIndex)

		if (findedIndex >= 0) {
			// cart[findedIndex].quantity += 1;
			cart[findedIndex].quantity += plus;
		} else {
			cart.push(good);
		}

		LocalStorage.set('SHOP_CART', cart);
	},
}

export default goodsActions;