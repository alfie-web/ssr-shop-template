import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/actions';

import { goodsAPI } from '../../api';
import MainLayout from '../../layouts/MainLayout';
import GoodSlider from '../../components/GoodSlider';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import Sizes from '../../components/Sizes';

const GoodPage = ({ data }) => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		size: data.Good.sizes[0] || '',
		quantity: 1
	});

	return (
		<MainLayout
			title={data.Good.title}
			description={data.smallDescription}
			className="GoodPage"
		>
			<div className="container">
				<div className="GoodPage__content">
				
					<GoodSlider 
						images={data.Good.images}
						className="GoodPage__gallery"
					/>

					<div className="GoodPage__info">
						<h3 className="GoodPage__title">{data.Good.title}</h3>
						<p className="GoodPage__brand">{data.Good.brand}</p>
						<p className="GoodPage__descr">{data.smallDescription}</p>

						<div className="box"> <div className="GoodPage__cost">{data.Good.cost} сом</div>
							<Counter 
								className="GoodPage__counter"
								onChange={(val) => setState({
									...state,
									quantity: val
								})}
								initialValue={state.quantity}
							/>
						</div>

						<Sizes 
							sizes={data.Good.sizes}
							initialValue={state.size}
							className="GoodPage__sizes"
							onChange={val => setState({
								...state,
								size: val
							})}
						/>

						<Button 
							text="В корзину"
							variant="brown"
							onClick={() => dispatch(cartActions.addGoodToCart({
								_id: data.Good._id,
								image: data.Good.images[0] || '',
								title: data.Good.title,
								cost: data.Good.cost,

								size: state.size,
								quantity: state.quantity,
							}))}
						/>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

// TODO: Попробовать getInitialProps
// и брать товар и store если есть
// Иначе делать запрос на сервак
// GoodPage.getInitialProps = async (ctx) => {
// 	console.log(ctx.query)

// 	return {}
// }


export async function getServerSideProps(ctx) {
	console.log(ctx.query)

	const { data } = await goodsAPI.getGoodContent(ctx.query.id)

	console.log(data.data)

	return {
		props: {
			data: data.data
		}
	}
}

export default GoodPage;
