import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import DeckNameEditForm from '../components/DeckNameEditForm.jsx';
import CardEditForm from '../components/CardEditForm.jsx';

class EditDeckPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck: {
				name: '',
				cards: []
			}
		};

		this.changeCardForm = this.changeCardForm.bind(this);
		this.changeDeckName = this.changeDeckName.bind(this);
		this.processDeckNameForm = this.processDeckNameForm.bind(this);
		this.processCardForm = this.processCardForm.bind(this);
		this.processEntireForm = this.processEntireForm.bind(this);
	}

	componentWillMount() {
		const listId = this.props.match.params.deck_id;
		axios.get(`/api/lists/${ listId }`, Auth.setHeader())
			.then(function(deck) {
				console.log(deck.data);
				this.setState({
					deck: deck.data
				});
			}.bind(this));
	}

	changeCardForm(event) {
		let cardIndex = event.target.form.id;
		let field = event.target.name;
		let deck = this.state.deck;
		deck.cards[cardIndex][field] = event.target.value;

		this.setState({
			deck
		});
	}

	changeDeckName(event) {
		let deck = this.state.deck;
		let field = event.target.name;
		deck[field] = event.target.value;

		this.setState({
			deck
		});
	}

	processDeckNameForm(event) {
		// event.preventDefault();

		console.log('deck form');
		let deck = this.state.deck;

		axios.post('/api/update/deckname', deck, Auth.setHeader())
			.then(function(response) {
				console.log(response);
			}.bind(this));
	}

	processCardForm(event) {
		event.preventDefault();

		console.log('card form');
		console.log(event.target.id);
		let cardIndex = event.target.id;

		let card = this.state.deck.cards[cardIndex];

		axios.post('/api/update/card', card, Auth.setHeader())
			.then(function(response) {
				console.log(response);
			}.bind(this));
	}

	processEntireForm(event) {
		event.preventDefault();

		console.log('entire form');
		let deck = this.state.deck;

		axios.post('/api/update/entireform', deck, Auth.setHeader())
			.then(function(response) {
				console.log(response);
			});
	}

	render() {
		return (
			<div>
				<DeckNameEditForm name={ this.state.deck.name } onChange={ this.changeDeckName } onSubmit={ this.processDeckNameForm } />
				{
					this.state.deck.cards.map((card, i) => {
						return (
							<CardEditForm key={ card._id } id={ i } card={ card } onChange={ this.changeCardForm } onSubmit={ this.processCardForm }/>
						)
					})
				}
				<button onClick={ this.processEntireForm }>Submit</button>
			</div>
		);
	}
}

export default EditDeckPage;