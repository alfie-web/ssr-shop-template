import Head from 'next/head';

import { groupsAPI } from '../api';
import { MainLayout } from '../layouts';
import { GoodsList } from '../components';

export default function Home({ groups }) {
	return (
		<MainLayout
			title="Интернет магазин"
			description="Магазин одежды"
		>
			<div className="container">
				<div className="Groups">
					{ groups && groups.length &&
						groups.map(g => (
							<div className="Group" key={g._id}>
								<h2>{g.name}</h2>

								<GoodsList 
									group={g}
									items={g.Goods}
									className="Group__goods"
								/>
							</div>
						))
					}
				</div>
			</div>
		</MainLayout>
	)
}

export async function getServerSideProps(ctx) {
	const { data } = await groupsAPI.getAll();

	// console.log('data', data.data)

	return {
		props: {
			groups: data.data
		}
	}
}