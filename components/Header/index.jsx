import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { cartActions } from '../../store/actions';
import LocalStorage from '../../helpers/LocalStorage';

import MiniCart from '../MiniCart';
import MainMenu from './MainMenu';

const Header = () => {
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const { items } = useSelector(state => state.cart);
	const dispatch = useDispatch();

	// TODO: Возможно стоит перенести кнопку cart в отельный компонент
	useEffect(() => {
		const goods = LocalStorage.get('SHOP_CART') || []
		goods.length && !items.length && dispatch(cartActions.setGoods(goods))
	}, [items])

	const toggleCartIsVisible = () => {
		// document.body.style.overflow = !isCartVisible ? 'hidden' : 'auto'
		setIsCartVisible(!isCartVisible);
	}

	return (
		<>
			<header className="Header">
				<div className="container">
					<div className="Header__left"></div>

					<div className="Header__center">
						<div className={classNames('MainMenu__icon', { 'MainMenu__icon--active': isMenuVisible })} onMouseOver={() => setIsMenuVisible(true)}>
							<svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 0H26V2H0V0Z" />
								<path d="M0 14H26V16H0V14Z" />
							</svg>
						</div>
					</div>

					<div className="Header__right">
						<div 
							className={classNames('Header__cart', {
								'active': isCartVisible
							})} 
							onClick={toggleCartIsVisible}
						>
							{ items.length 
								? <span className="Header__cart-quantity">{items.length}</span> 
								: null
							}

							<svg width="25" height="28" viewBox="0 0 25 28" xmlns="http://www.w3.org/2000/svg">
								<path d="M24.2295 27.0797L22.1014 6.81392C22.0568 6.38967 21.6992 6.06752 21.2726 6.06752H17.2727V5.15557C17.2727 2.31289 14.9598 0 12.1171 0C9.27425 0 6.96136 2.31289 6.96136 5.15557V6.06752H2.96149C2.53488 6.06752 2.17728 6.38967 2.13263 6.81392L0.00452452 27.0797C-0.0200421 27.3144 0.0562212 27.5488 0.214088 27.7244C0.372169 27.8998 0.597327 27.9999 0.83338 27.9999H23.4005C23.6367 27.9999 23.8619 27.8998 24.0198 27.7244C24.1781 27.5488 24.2541 27.3144 24.2295 27.0797ZM8.62804 5.15557C8.62804 3.2319 10.1933 1.66668 12.1171 1.66668C14.0408 1.66668 15.606 3.2319 15.606 5.15557V6.06752H8.62804V5.15557ZM1.75879 26.3333L3.71194 7.73421H6.96136V9.57072C6.96136 10.0309 7.33456 10.4041 7.7947 10.4041C8.25484 10.4041 8.62804 10.0309 8.62804 9.57072V7.73421H15.606V9.57072C15.606 10.0309 15.9792 10.4041 16.4394 10.4041C16.8995 10.4041 17.2727 10.0309 17.2727 9.57072V7.73421H20.5221L22.4753 26.3333H1.75879Z"/>
							</svg>
						</div>
					</div>
				</div>
			</header>

			{ isMenuVisible && <MainMenu isVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} /> }

			{ isCartVisible && <MiniCart items={items} toggleCartIsVisible={toggleCartIsVisible} /> }
		</>
	)
}

export default Header;
