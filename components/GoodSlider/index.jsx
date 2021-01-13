import React, { memo, useState } from 'react';
import classNames from 'classnames';

import Preview from './components/Preview';
import CurrentSlide from './components/CurrentSlide';

const GoodSlider = ({ className, images }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const onChangeSlide = (i) => {
		setCurrentSlide(i);
	}

	return images && images.length ? (
		<div className={classNames('GoodSlider', className)}>
			<div className="GoodSlider__previews">
				{ images.map((item, i) => (
					<Preview 
						key={item + i}
						onClick={onChangeSlide.bind(null, i)}
						item={item}
						currentSlide={currentSlide}
						isActive={i === currentSlide}
					/>
				))}
			</div>

			{/* <div className="GoodSlider__current">
				<div className="GoodSlider__current-img">
					<img src={images[currentSlide]} alt=""/>
				</div>
			</div> */}
			<CurrentSlide 
				imgUrl={ images[currentSlide] }
			/>
		</div>
	) : null
}

export default memo(GoodSlider);
