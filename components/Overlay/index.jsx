import React from 'react';

const Overlay = ({ onClick, onHover }) => {
	return (
		<div className="Overlay" onClick={onClick} onMouseOver={onHover}></div>
	)
}

export default Overlay;
