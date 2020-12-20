import React, { useEffect, useState, useCallback, memo, Fragment } from 'react';
import classNames from 'classnames';

import { groupsAPI } from '../../api';

import { GoodItem } from '../';

const GoodsList = memo(({ group, className, items }) => {
	// const [items, setItems] = useState([]);
	const { _id, goods } = group;

	console.log('GoodsList_RENDERS', items)

	// const fetchGoods = useCallback(() => {
	// 	fetchGoodsByGroup(_id)
	// }, [fetchGoodsByGroup, _id])

	// useEffect(async () => {
	// 	if (!goods) {
	// 		// console.log(_id)
	// 		const { data } = await groupsAPI.getGoodsByGroup(_id);
	// 		console.log(data)
	// 		setItems(data.data.goods)
	// 	};
	// }, [goods])

	return (
		<Fragment>
			<div className={classNames('Goods', className)}>
				{
					items && items.length && items.map((item) => {
						return item ? (
							<GoodItem 
								key={item._id}
								_id={item._id}
								title={item.title}
								cost={item.cost}
								images={item.images}
								sizes={item.sizes}
							/>
						) : null
					})
				}
			</div>

			{/* { !group.isLastPage &&
				<Button 
					content="Показать ещё"
					// variant="black"
					onClick={fetchGoods}
				/>
			} */}
			
		</Fragment>
	)
})

// GoodsList.getInitialProps = async (ctx) => {
// 	console.log('ctx', ctx)

// 	return {}
// }

// export async function getServerSideProps(ctx) {
// 	console.log('ctx', ctx)

// 	return {
// 		props: {}
// 	}
// }

export default GoodsList;