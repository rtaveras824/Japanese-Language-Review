import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeckList = ({ decks, makeActiveDeck }) => {
	const deckItems = decks.map(function(deck, i) {
		return (
			<div key={ i }>
				<div onClick={ () => makeActiveDeck(deck) }>
					{ deck.name }
				</div>
				<Link to={`/cards/${deck._id}/0`}>Study</Link>
			</div>
		)
	})

	return (
		<div>
			{ deckItems }
		</div>
	);
}

export default DeckList;