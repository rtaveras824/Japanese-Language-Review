import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import DeckList from '../components/DecksList.jsx';
import CardList from '../components/CardsList.jsx';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: '',
			decks: [],
			selectedDeck: { _id: 1 },
			cards: []
		}

		this.retrieveCards = this.retrieveCards.bind(this);
		this.retrieveDecks = this.retrieveDecks.bind(this);
		this.makeActiveDeck = this.makeActiveDeck.bind(this);
	}

	componentWillMount() {
		axios.get('/api/publiclists', Auth.setHeader())
			.then(function(decks) {
				console.log(decks);

				this.setState({
					decks: decks.data,
					selectedDeck: decks.data[0]
				});

				this.retrieveCards(decks.data[0]._id);
				
			}.bind(this));
	}

	retrieveDecks(type) {
		let url;
		switch(type) {
			case 'public':
				url = 'publiclists';
				break;
			case 'userprivate':
				url = 'userprivatelists';
				break;
			case 'userpublic':
				url = 'userpubliclists';
				break;
			case 'saved':
				url = 'savedlists';
				break;
			default:
				url = 'publiclists';
				break;
		}

		axios.get(`/api/${url}`, Auth.setHeader())
			.then(function(decks) {
				this.setState({
					type,
					decks: decks.data,
					selectedDeck: decks.data[0]
				});

				this.retrieveCards(decks.data[0]._id);
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
				<div onClick={ () => this.retrieveDecks('userprivate') }>User Private Lists</div>
				<div onClick={ () => this.retrieveDecks('userpublic') }>User Public Lists</div>
				<div onClick={ () => this.retrieveDecks('saved') }>Saved Lists</div>
				<div onClick={ () => this.retrieveDecks('public') }>Public Lists</div>
				<DeckList type={ this.state.type } decks={ this.state.decks } makeActiveDeck={ this.makeActiveDeck } />
				<CardList deckId={ this.state.selectedDeck._id } cards={ this.state.cards } />
			</div>
		)
	}
}

export default MainPage;