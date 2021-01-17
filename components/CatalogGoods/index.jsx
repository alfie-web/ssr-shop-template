import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import GoodItem from '../../components/GoodItem'
import Pagination from '../../components/Pagination'

// import Pagination from './Pagination';

const CatalogGoods = ({ items }) => {
	// const [data, setData] = useState(items);

	const dispatch = useDispatch();
	const { items: goods } = useSelector(state => state.goods);

	console.log('items', items)

	// useEffect(() => {

	// })

	return (
		<div className="Catalog__goods">
			<div className="Goods">
			{ !goods.length && items.length ?
				// Первый рендер для SEO
				items.map(item => (
					// <div className="Post" key={post._id}>
					// 	<Link href="/post/[id]" as={`/post/${post._id}`}><a>{post.title}</a></Link>
					// </div>
					<GoodItem 
						key={item._id}
						_id={item._id}
						title={item.title}
						cost={item.cost}
						images={item.images}
						sizes={item.sizes}
					/>
				))
				// <div>Loading</div>
				: <>
					{/* <span>Redux</span> */}
					{
						goods.map(item => (
							<GoodItem 
								key={item._id}
								_id={item._id}
								title={item.title}
								cost={item.cost}
								images={item.images}
								sizes={item.sizes}
							/>
							// <div className="Post" key={post._id}>
							// 	<Link href="/post/[id]" as={`/post/${post._id}`}><a>{post.title}</a></Link>
							// </div>
						))
					}
				</>
			}

			{/* <Pagination 
			
			/> */}
			</div>

			<Pagination />
		</div>
	)
}

export default CatalogGoods
