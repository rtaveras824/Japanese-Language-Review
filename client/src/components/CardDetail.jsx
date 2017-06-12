import React from 'react';

const CardDetail = ({ card }) => {
	return (
		<div>
			<h1>{ card.sideA }</h1>
			<h2>{ card.sideB }</h2>
		</div>
	)
}

export default CardDetail;