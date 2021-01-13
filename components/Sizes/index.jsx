import React, { useState } from 'react';
import classNames from 'classnames';

const Sizes = ({ className, sizes, initialValue = '', onChange = () => {} }) => {
	const [state, setState] = useState(initialValue);

	const handleClick = (val) => {
		onChange(val);
		setState(val);
	}

	return sizes && sizes.length ? (
		<div className={classNames('Sizes', className)}>
			{ sizes.map(s => (
				<span 
					className={classNames({
						'active': state === s
					})}
					key={s} 
					onClick={() => handleClick(s)}
				>
					{s}
				</span>
			))}
		</div>
	) : null
}

export default Sizes;
