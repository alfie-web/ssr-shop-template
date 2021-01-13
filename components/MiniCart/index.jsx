import React  from 'react';

import Overlay from '../Overlay';
import Item from './Item';

const MiniCart = ({ items, toggleCartIsVisible }) => {
	console.log('MiniCart renders')

	return (
		<div className="MiniCart">
			<Overlay onClick={toggleCartIsVisible} />

			<div className="MiniCart__container">
					<div className="MiniCart__items">
						{ items && items.length 
							? items.map(good => (
								<Item 
									key={good._id + good.size}
									good={good}
								/>
							)) 
							: <span>Корзина пуста :(</span>
						}
					</div>

					<div className="MiniCart__bottom">
						<div className="container">
							<span>Перейти в корзину</span>

							<div className="MiniCart__total">
								Итого к оплате:
								<span>
									{ items.reduce((acc, good) => {
										return acc += good.cost * good.quantity
									}, 0) } сом
								</span>
							</div>
						</div>
					</div>
			</div>
		</div>
	)
}

export default MiniCart;
