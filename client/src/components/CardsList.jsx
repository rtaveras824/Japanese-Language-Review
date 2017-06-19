import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ deckId, cards, toggleSaved }) => {
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
			<button onClick={ toggleSaved }>Save</button>
			<Link to={`/addcard/${ deckId }`}>Add Cards</Link>
			{ cardItems }
		</div>
	)
}

export default CardList;