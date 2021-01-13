import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { cartActions } from '../../store/actions';
import Counter from '../Counter';
import Button from '../Button';

const Item = ({ good }) => {
	const dispatch = useDispatch();

	return (
		<div className="MiniCart__item">
			<div className="MiniCart__item-left">
				<div className="MiniCart__item-image">
					<img 
						src={good.image}
						alt="Good image"
					/>
				</div>
				<h3 className="GoodItem__title MiniCart__item-title">
					<Link href="/good/[id]" as={`/good/${good._id}`}><a>{good.title}</a></Link>
				</h3>
			</div>

			<Counter 
				onChange={(val) => dispatch(cartActions.changeGoodQuantity({
					_id: good._id,
					size: good.size
				}, val))}
				className="MiniCart__item-quantity"
				initialValue={good.quantity}
			/>

			<span className="MiniCart__item-cost">{good.cost} сом</span>
			<span className="MiniCart__item-size">{good.size}</span>

			<Button 
				// text="X"
				icon={
					<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.158379 0.983154L0.98291 0.158624L14.9999 14.1756L14.1754 15.0002L0.158379 0.983154Z" />
						<path d="M14.017 0L14.8416 0.824531L0.824531 14.8416L0 14.017L14.017 0Z" />
					</svg>
				}
				rounded
				onClick={() => dispatch(cartActions.removeGoodFromCart({
					_id: good._id,
					size: good.size
				}))}
			/>
		</div>
	)
}

export default Item;
