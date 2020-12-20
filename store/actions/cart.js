
import LocalStorage from '../../helpers/LocalStorage';

const cartActions = {
	setGoods: (goods) => ({
		type: 'CART:SET_GOODS',
		payload: goods
	}),

	addGood: (good) => ({
		type: 'CART:ADD_GOOD',
		payload: good
	}),

	removeGood: (goodIndex) => ({
		type: 'CART:REMOVE_GOOD',
		payload: goodIndex
	}),

	changeQuantity: (goodIndex, quantity) => ({
		type: 'CART:CHANGE_GOOD_QUANTITY',
		payload: {goodIndex, quantity}
	}),

	addGoodToCart: good => dispatch => {
		const plus = good.quantity ? good.quantity : 1;
		good = {
			...good,
			quantity: plus
		}

		console.log('good', good)

		// А вообще конечно вопрос, нужно ли хранить в store?
		// TODO: Установить какой-то лимит по одинарному заказу
		// TODO: Очищать, когда заказ оформлен
		dispatch(cartActions.addGood(good));

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

	removeGoodFromCart: good => dispatch => {	
		const cart = LocalStorage.get('SHOP_CART') || [];
		const findedIndex = cart.findIndex(item => item._id === good._id && item.size === good.size);
		const newCart = cart.filter((item, i) => i !== findedIndex);

		dispatch(cartActions.removeGood(findedIndex));

		LocalStorage.set('SHOP_CART', newCart);
	},

	changeGoodQuantity: (good, quantity) => dispatch => {
		const cart = LocalStorage.get('SHOP_CART') || [];
		const findedIndex = cart.findIndex(item => item._id === good._id && item.size === good.size);

		cart[findedIndex].quantity = quantity;

		dispatch(cartActions.changeQuantity(findedIndex, quantity));

		LocalStorage.set('SHOP_CART', cart);
	}
}

export default cartActions;