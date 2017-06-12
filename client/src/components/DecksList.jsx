import React, { Component } from 'react';
import axios from 'axios';

const DeckList = ({ decks, makeActiveDeck }) => {
	const deckItems = decks.map(function(deck, i) {
		return (
			<div key={ i } onClick={ () => makeActiveDeck(deck) }>
				{ deck.name }
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