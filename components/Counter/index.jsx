import React, { useState } from 'react';
import classNames from 'classnames';

const Counter = ({ className, initialValue = 1, onChange = () => {} }) => {
	const [state, setState] = useState(initialValue);

	const handleClick = (val) => {
		if (state + val < 1) return;

		onChange(state + val);
		setState(state + val);
	}

	return (
		<div className={classNames('Counter', className)}>
			{/* <button onClick={() => handleClick(-1)}>–</button> */}
			<button onClick={() => handleClick(-1)}>-</button>
			<span>{state}</span>
			<button onClick={() => handleClick(1)}>+</button>
		</div>
	)
}

export default Counter;
