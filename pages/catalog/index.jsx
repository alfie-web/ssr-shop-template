import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';

import goodsAPI from '../../api/goods'
import goodsActions from '../../store/actions/goods'
import MainLayout from '../../layouts/MainLayout'
import CatalogGoods from '../../components/CatalogGoods'
// import Pagination from '../../components/Pagination'

const Catalog = ({ goodsData }) => {
	const dispatch = useDispatch();
	const { query: { page } } = useRouter();

	console.log('goodsData', goodsData)

	useEffect(async () => {
		console.log('page changed', page)
		// !reduxPosts.length && console.log('Mount')
		dispatch(goodsActions.setGoods(goodsData));	
	}, [page, goodsData])

	return (
		<MainLayout
			title="Каталог товаров"
			description="Каталог товаров"
			className="Catalog"
		>
			<div className="container">
				<div className="box">
					<h2>Каталог</h2>
				</div>

				<div className="Catalog__filters">
					Фильтры
				</div>

				<CatalogGoods 
					items={goodsData.goods}
				/>

				{/* <Pagination /> */}
			</div>
		</MainLayout>
	)
}

export async function getServerSideProps({ query: { page = 0 } }) {
	const { data } = await goodsAPI.getAll(page)

	console.log('page', page)

	return {
		props: {
			goodsData: data.data
		}
	}
}

// Catalog.getInitialProps = async ({ query: { page = 0 } }) => {	// в контексте можно найти текущие параметры (например id)
// 	const { data } = await goodsAPI.getAll(page)

// 	console.log('data', data)

// 	return {
// 		goodsData: data.data.goods
// 	}
// }

export default Catalog
