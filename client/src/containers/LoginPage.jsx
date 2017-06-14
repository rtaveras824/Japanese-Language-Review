import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../../modules/Auth';

import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				display_name: '',
				password: ''
			},
			redirect: false
		}

		this.changeUser = this.changeUser.bind(this);
		this.processForm = this.processForm.bind(this);
	}

	changeUser(event) {
		var field = event.target.name;
		var value = event.target.value;
		var user = this.state.user;
		user[field] = value;

		this.setState({
			user
		});
	}

	processForm(event) {
		event.preventDefault();

		const display_name = this.state.user.display_name;
		const password = this.state.user.password;

		const user = this.state.user;

		axios.post('/auth/login', user)
			.then(function(response) {
				Auth.authenticateUser(response.data.token);
				this.setState({
					redirect: true
				});
			}.bind(this)).catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				{ Auth.isUserAuthenticated() ? (
						<Redirect to="/" push />
					) : (
						<LoginForm 
							onSubmit={ this.processForm }
							onChange={ this.changeUser } 
							/>
					)
				}
			</div>
		);
	}
}

export default LoginPage;