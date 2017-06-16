import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import DeckList from '../components/DecksList.jsx';
import CardList from '../components/CardsList.jsx';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			publicDecks: [],
			privateDecks: [],
			selectedDeck: { _id: 1 },
			cards: []
		}

		this.retrieveCards = this.retrieveCards.bind(this);
		this.makeActiveDeck = this.makeActiveDeck.bind(this);
		this.setHeader = this.setHeader.bind(this);
	}

	setHeader() {
		const config = {};
		console.log('mounting');
		if (Auth.isUserAuthenticated()) {
			const token = Auth.getToken();
			config.headers = {
				"Authorization": `bearer ${token}`
			};

			return config;
		}
	}

	componentWillMount() {
		axios.get('/api/lists', this.setHeader())
			.then(function(decks) {
				console.log(decks);
				this.setState({
					publicDecks: decks.data.public,
					privateDecks: decks.data.private,
					selectedDeck: decks.data.public[0]
				});
				this.retrieveCards(decks.data.public[0]._id);
			}.bind(this));
	}

	retrieveCards(deckId) {
		console.log('retrieveCard');
		axios.get('/api/lists/' + deckId)
			.then(function(list) {
				console.log('list', list);
				this.setState({
					cards: list.data.cards
				});
			}.bind(this));
	}

	makeActiveDeck(selectedDeck) {
		this.setState({ selectedDeck });
		this.retrieveCards(selectedDeck._id);
	}

	render() {
		return (
			<div>
				<div>Private</div>
				<DeckList 
					decks={ this.state.privateDecks }
					makeActiveDeck={ this.makeActiveDeck } />
				<div>Public</div>
				<DeckList 
					decks={ this.state.publicDecks }
					makeActiveDeck={ this.makeActiveDeck } />
				<CardList deckId={ this.state.selectedDeck._id } cards={ this.state.cards } />
			</div>
		)
	}
}

export default MainPage;