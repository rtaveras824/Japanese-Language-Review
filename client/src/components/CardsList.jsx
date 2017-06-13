import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ deckId, cards }) => {
	const cardItems = cards.map(function(card, i) {
		return (
			<div key={ i }>
				<div>{ card.sideA }</div>
				<Link to={`/cards/${deckId}/${i}`}>Study</Link>
			</div>
		)
	});

	return (
		<div>
			{ cardItems }
		</div>
	)
}

export default CardList;