import classNames from 'classnames';

const Preview = ({ item, isActive, onClick }) => {
	return (
		<div 
			
			className={classNames('GoodSlider__preview', {
				'GoodSlider__preview--active': isActive
			})} 
			onClick={onClick}
		>
			<img src={item} alt=""/>
		</div>
	)
}

export default Preview;