import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import AddDeckForm from '../components/AddDeckForm.jsx';

class AddDeckPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false,
			deck: {
				name: '',
				public: false
			}
		};

		this.changeForm = this.changeForm.bind(this);
		this.processForm = this.processForm.bind(this);
	}

	changeForm(event) {
		var field = event.target.name;
		var deck = this.state.deck;

		deck[field] = event.target.value;
		if (field == 'public') {
			deck[field] = event.target.checked;
		}

		this.setState({
			deck
		});
	}

	processForm(event) {
		event.preventDefault();

		axios.post('/api/addlist', this.state.deck, Auth.setHeader())
			.then(function(response) {
				console.log(response);
				this.setState({
					redirect: true
				});
			}.bind(this));
	}

	render() {
		return (
			<div>
				{ this.state.redirect ? (
					<Redirect to="/" push /> 
				) : (
					<AddDeckForm 
						onSubmit={ this.processForm }
						onChange={ this.changeForm } />
				)
				}
			</div>
		)
	}
}

export default AddDeckPage;