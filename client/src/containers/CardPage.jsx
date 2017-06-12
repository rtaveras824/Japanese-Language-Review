import React, { Component } from 'react';
import axios from 'axios';

import CardDetail from '../components/CardDetail.jsx';

class CardPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cards: [],
			selectedCard: {},
			position: 0
		}

		this.cycleBack = this.cycleBack.bind(this);
		this.cycleForward = this.cycleForward.bind(this);
		this.voice = this.voice.bind(this);
	}

	componentWillMount() {
		axios.get(`/api/lists/${this.props.match.params.deck_id}`)
			.then(function(decks) {
				var cards = decks.data.cards;
				
				this.setState({
					cards: cards,
					selectedCard: cards[0]
				})
			}.bind(this));
	}

	cycleBack() {
		var position = this.state.position;
		position--;

		if (position < 0)
			position = this.state.cards.length - 1;

		this.setState({
			selectedCard: this.state.cards[position],
			position
		});
	}

	cycleForward() {
		var position = this.state.position;
		position++;

		if (position >= this.state.cards.length)
			position = 0;
	
		this.setState({
			selectedCard: this.state.cards[position],
			position
		});
	}

	voice() {
		responsiveVoice.speak(this.state.selectedCard.sideA, 'Japanese Female');
	}

	render() {
		return (
			<div>
				<CardDetail card={ this.state.selectedCard }/>
				<div onClick={ this.voice }>Voice</div>
				<div onClick={ this.cycleBack }>&lt;</div>
				<div onClick={ this.cycleForward }>&gt;</div>
			</div>
		);
	}
}

export default CardPage;