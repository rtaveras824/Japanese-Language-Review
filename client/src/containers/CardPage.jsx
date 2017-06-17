import React, { Component } from 'react';
import axios from 'axios';

import CardDetail from '../components/CardDetail.jsx';

class CardPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			answer: '',
			correct: false,
			cards: [],
			selectedCard: {},
			cardOrder: [],
			position: 0
		}

		this.changeAnswer = this.changeAnswer.bind(this);
		this.cycleBack = this.cycleBack.bind(this);
		this.cycleForward = this.cycleForward.bind(this);
		this.processAnswer = this.processAnswer.bind(this);
		this.japaneseVoice = this.japaneseVoice.bind(this);
		this.englishVoice = this.englishVoice.bind(this);
	}

	componentWillMount() {
		var deckId = this.props.match.params.deck_id;
		var cardNumberOrRandom = this.props.match.params.card_number;

		axios.get(`/api/lists/${deckId}`)
			.then(function(decks) {
				var cards = decks.data.cards;
				
				if (cardNumberOrRandom == 'random') {
					var cardOrder = this.randomNumbers(cards);
					var cardNumber = 0;
				} else {
					var cardOrder = this.orderedNumbers(cards);
					var cardNumber = cardNumberOrRandom;
				}

				this.setState({
					cards: cards,
					position: cardNumber,
					cardOrder,
					selectedCard: cards[cardOrder[cardNumber]]
				})
			}.bind(this));
	}

	//Check answer input
	changeAnswer(event) {
		this.setState({
			answer: event.target.value
		});
	}

	//Cycle back through cards
	cycleBack() {
		var cardOrder = this.state.cardOrder;
		var position = this.state.position;
		position--;

		if (position < 0)
			position = cardOrder.length - 1;

		this.setState({
			selectedCard: this.state.cards[cardOrder[position]],
			position,
			correct: false
		});
	}

	//Cycle forward through cards
	cycleForward() {
		var cardOrder = this.state.cardOrder;
		var position = this.state.position;
		position++;

		if (position >= cardOrder.length)
			position = 0;
	
		this.setState({
			selectedCard: this.state.cards[cardOrder[position]],
			position,
			correct: false
		});
	}

	orderedNumbers(cards) {
		var max = cards.length;
		var position = [];

		for (var i = 0; i < max; i++) {
			position.push(i);
		}

		return position;
	}

	randomNumbers(cards) {
		var max = cards.length;
		var position = this.orderedNumbers(cards);
		var randomNumbers = shuffle(position);
		return randomNumbers;

		//Fisher-Yates (aka Knuth) Shuffle
		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

			  	// Pick a remaining element...
			  	randomIndex = Math.floor(Math.random() * currentIndex);
			  	currentIndex -= 1;

			  	// And swap it with the current element.
			  	temporaryValue = array[currentIndex];
			  	array[currentIndex] = array[randomIndex];
			  	array[randomIndex] = temporaryValue;
			}

		  return array;
		}
	}

	processAnswer(event) {
		if (this.state.answer == this.state.selectedCard.sideB) {
			console.log('Correct!');
			this.setState({
				correct: true
			});
		}
	}

	//responseVoice comes from index.html script tag
	japaneseVoice() {
		responsiveVoice.speak(this.state.selectedCard.side_a, 'Japanese Female');
	}

	englishVoice() {
		responsiveVoice.speak(this.state.selectedCard.side_b, 'US English Male');
	}

	render() {
		return (
			<div>
				<CardDetail 
					card={ this.state.selectedCard }
					correct={ this.state.correct }
					changeAnswer={ this.changeAnswer }
					processAnswer={ this.processAnswer } />
				<div onClick={ this.japaneseVoice }>Japanese Voice</div>
				<div onClick={ this.englishVoice }>English Voice</div>
				<div onClick={ this.cycleBack }>&lt;</div>
				<div onClick={ this.cycleForward }>&gt;</div>
			</div>
		);
	}
}

export default CardPage;