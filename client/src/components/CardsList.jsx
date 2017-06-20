import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ deckId, cards, saved, toggleSaved }) => {
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
			{ saved ? (
				<button onClick={ toggleSaved }>Unsave</button>
			):(
				<button onClick={ toggleSaved }>Save</button>
			)}
			<Link to={`/editlist/${ deckId }`}>Edit Deck</Link>
			<Link to={`/addcard/${ deckId }`}>Add Cards</Link>
			{ cardItems }
		</div>
	)
}

export default CardList;