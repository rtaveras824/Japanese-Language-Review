import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import AddCardForm from '../components/AddCardForm.jsx';
import CardsList from '../components/CardsList.jsx';

class AddCardPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cards: [],
			card: {
				deck_id: this.props.match.params.deck_id,
				side_a: '',
				side_b: '',
				photo_url: '',
			}
		};
		console.log('list id', this.props.match.params.deck_id);
		this.processForm = this.processForm.bind(this);
		this.processChange = this.processChange.bind(this);
		this.setHeader = this.setHeader.bind(this);
	}

	componentWillMount() {
		axios.get(`/api/lists/${ this.props.match.params.deck_id }`, this.setHeader())
			.then(function(response) {
				this.setState({
					cards: response.data.cards
				})
			}.bind(this));
	}

	setHeader() {
		var config = {};
		if (Auth.isUserAuthenticated()) {
			var token = Auth.getToken();
			config.headers = {
				"Authorization": `bearer ${token}`
			}
		}

		return config;
	}

	processChange(event) {
		var field = event.target.name;
		var card = this.state.card;
		card[field] = event.target.value;

		this.setState({
			card
		});
	}

	processForm(event) {
		event.preventDefault();

		axios.post('/api/addcard', this.state.card, this.setHeader())
			.then((response) => {
				console.log(response);
				var cards = this.state.cards;
				cards.push(response.data);
				
				this.setState({
					cards
				});
			});
	}

	render() {
		return (
			<div>
				<CardsList 
					deckId={ this.props.match.params.deck_id }
					cards={ this.state.cards }
					/>
				<AddCardForm
					onSubmit={ this.processForm }
					onChange={ this.processChange }
					/>
			</div>
		)
	}
}

export default AddCardPage;