import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ deckId, cards }) => {
	const cardItems = cards.map(function(card, i) {
		return (
			<div key={ i }>
				<div>{ card.side_a }</div>
				<Link to={`/cards/${deckId}/${i}`}>Study</Link>
			</div>
		)
	});

	return (
		<div>
			<Link to={`/addcard/${ deckId }`}>Add Cards</Link>
			{ cardItems }
		</div>
	)
}

export default CardList;