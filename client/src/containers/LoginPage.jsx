import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				display_name: '',
				password: ''
			}
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
		const user = this.state.user;

		axios.post('/auth/login', user)
			.then(function(response) {
				console.log(response);
				<Redirect to='/' />
			});
	}

	render() {
		return (
			<LoginForm 
				onSubmit={ this.processForm }
				onChange={ this.changeUser } 
				/>
		);
	}
}

export default LoginPage;