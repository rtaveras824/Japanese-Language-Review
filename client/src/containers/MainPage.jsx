import React, { Component } from 'react';
import axios from 'axios';

import DeckList from '../components/DecksList.jsx';
import CardList from '../components/CardsList.jsx';

class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			decks: [],
			selectedDeck: { _id: 1 },
			cards: []
		}

		//this.retrieveCards = this.retrieveCards.bind(this);
	}

	componentWillMount() {
		axios.get('/api/lists')
			.then(function(decks) {
				this.setState({
					decks: decks.data,
					selectedDeck: decks.data[0]
				});
				this.retrieveCards(decks.data[0]._id);
			}.bind(this));
	}

	retrieveCards(deckId) {
		axios.get('/api/lists/' + deckId)
			.then(function(list) {
				this.setState({
					cards: list.data.cards
				});
			}.bind(this));
	}

	render() {
		return (
			<div>
				<DeckList 
					decks={ this.state.decks }
					makeActiveDeck={ 
						selectedDeck => {
							this.setState({ selectedDeck });
							this.retrieveCards(selectedDeck._id);
						}
					} />
				<CardList deckId={ this.state.selectedDeck._id } cards={ this.state.cards } />
			</div>
		)
	}
}

export default MainPage;