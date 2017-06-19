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
			cards: [],
			saved: false
		}

		this.retrieveCards = this.retrieveCards.bind(this);
		this.retrieveDecks = this.retrieveDecks.bind(this);
		this.makeActiveDeck = this.makeActiveDeck.bind(this);
		this.toggleSaved = this.toggleSaved.bind(this);
	}

	componentWillMount() {
		this.retrieveDecks('public');
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
			.then(function(response) {
				let decks = response.data;
				if (type === 'saved') {
					console.log('decks', decks);
					let savedDecks = decks.map((deck, i) => {
						return deck.list_id;
					});
					decks = savedDecks;
					console.log('decks2', decks);
				}
				this.setState({
					type,
					decks: decks,
					selectedDeck: decks[0]
				});

				this.retrieveCards(decks[0]._id);
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

	toggleSaved() {
		axios.post('/api/addsaved', {
			list_id: this.state.selectedDeck._id
			},
			Auth.setHeader())
			.then(function(response) {
				console.log('user list saved', response);
			});
	}

	render() {
		return (
			<div>
				<div onClick={ () => this.retrieveDecks('userprivate') }>User Private Lists</div>
				<div onClick={ () => this.retrieveDecks('userpublic') }>User Public Lists</div>
				<div onClick={ () => this.retrieveDecks('saved') }>Saved Lists</div>
				<div onClick={ () => this.retrieveDecks('public') }>Public Lists</div>
				<DeckList type={ this.state.type } decks={ this.state.decks } makeActiveDeck={ this.makeActiveDeck } />
				<CardList deckId={ this.state.selectedDeck._id } cards={ this.state.cards } toggleSaved={ this.toggleSaved } />
			</div>
		)
	}
}

export default MainPage;