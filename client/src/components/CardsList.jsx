import React from 'react';

const CardList = (props) => {
	const cardItems = props.cards.map(function(card, i) {
		return (
			<div key={ i }>{ card.sideA }</div>
		)
	});

	return (
		<div>
			{ cardItems }
		</div>
	)
}

export default CardList;