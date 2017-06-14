import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				display_name: '',
				password: ''
			},
			redirect: false
		}

		this.processForm = this.processForm.bind(this);
		this.changeUser = this.changeUser.bind(this);
	}

	changeUser(event) {
		var field = event.target.name;
		var user = this.state.user;
		user[field] = event.target.value;

		this.setState({
			user
		});
	}

	processForm(event) {
		event.preventDefault();

		var user = this.state.user;

		axios.post('/auth/signup', user)
			.then(function(response) {
				console.log('signup', response);
				Auth.authenticateUser(response.data.token);
				this.setState({
					redirect: true
				});
			}.bind(this));
	}

	render() {
		return (
			Auth.isUserAuthenticated() ? (
				<Redirect to='/' push />
			) : (
				<SignUpForm
					onSubmit={ this.processForm }
					onChange={ this.changeUser }
					/>
			)
		);
	}
}

export default SignUpPage;