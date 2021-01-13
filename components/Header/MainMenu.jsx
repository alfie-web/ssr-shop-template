import React, { useEffect, useState, memo } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import Overlay from '../Overlay';
import { menuActions } from '../../store/actions';

const MainMenu = ({ isVisible = false, setIsMenuVisible }) => {
	const [hovered, setHovered] = useState(null);

	const dispatch = useDispatch();
	const { items } = useSelector(store => store.menu);

	useEffect(() => {
		!items.length && dispatch(menuActions.fetchFirstLevelItems());
		
		// hovered && items.length && !items.find(item => item._id.children) && dispatch(menuActions.fetchByParent(hovered));
		// hovered && items.length && !items.find(item => item._id === hovered && item.children) && dispatch(menuActions.fetchByParent(hovered));
		// hovered && items.length && dispatch(menuActions.fetchByParent(hovered));
	}, [items, hovered])

	const getChildren = (parent) => {
		dispatch(menuActions.fetchByParent(parent));
		setHovered(parent)
	}

	return isVisible ? (
		<>
			<nav className={classNames('MainMenu', {
				'MainMenu--visible': isVisible
			})}>
				<div className="MainMenu__top">
					<div className="container">
						{ items.length && items.map(item => (
							<span 
								key={item._id} 
								className={classNames({'active': hovered === item._id})} 
								onMouseOver={() => getChildren(item._id)}
							>
								<Link href={`/catalog?page=0&category=${item.slugName}`}><a>{item.name}</a></Link>
							</span>
						)) }
					</div>
				</div>

				{ items.length && items.find(i => i._id === hovered) && items.find(i => i._id === hovered).children &&
					<div className="MainMenu__bottom">
						<div className="container">
							{ items.find(i => i._id === hovered).children.map(it => (
								<span key={it._id}>
									<Link href={`/catalog?page=0&category=${it.slugName}`}><a>{it.name}</a></Link>
								</span>

							)) }
						</div>
					</div>
				}
			</nav>

			<Overlay 
				onHover={() => setIsMenuVisible(false)}
			/>
		</>
	) : null
}

export default memo(MainMenu);
