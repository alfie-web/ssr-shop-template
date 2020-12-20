import React  from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { cartActions } from '../../store/actions';
// import LocalStorage from '../../helpers/LocalStorage';
import Overlay from '../Overlay';

const MiniCart = ({ items, toggleCartIsVisible }) => {

	return (
		<div className="MiniCart">
			<Overlay onClick={toggleCartIsVisible} />

			<div className="MiniCart__container">
					<div className="MiniCart__items">
						{ items && items.length 
							? items.map(good => (
								<div className="MiniCart__item" key={good._id + good.size}>
									<div className="MiniCart__item-left">
										<div className="MiniCart__item-image">
											<img 
												src={good.image}
												alt="Good image"
											/>
										</div>
										<h3 className="GoodItem__title MiniCart__item-title">{good.title}</h3>
									</div>

									<span className="MiniCart__item-cost">{good.cost} сом</span>
									<span className="MiniCart__item-size">{good.size}</span>
								</div>
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
