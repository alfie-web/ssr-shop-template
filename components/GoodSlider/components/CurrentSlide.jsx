

const CurrentSlide = ({ imgUrl }) => {
	return (
		<div className="GoodSlider__current">
			<div className="GoodSlider__current-img">
				<img src={imgUrl} alt="Slide"/>
			</div>
		</div>
	)
}

export default CurrentSlide;
