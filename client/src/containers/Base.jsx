import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Auth from '../../../modules/Auth';

import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import CardPage from './CardPage.jsx';

const AuthButton = withRouter(({ history }) => {
	function deauthAndRedirect() {
		Auth.deauthenticateUser();
		history.push('/');
	}
	return Auth.isUserAuthenticated() ? (
		<p onClick={ () => { 
			history.push('/'); 
			Auth.deauthenticateUser(); 
		}}>Welcome</p>
	) : (
		<Link to='/auth/login'>Login</Link>
	)
});

class Base extends Component {
	constructor(props) {
		super(props);


	}

	render() {
		console.log(Auth.getToken());
		return (
			<div>
				<div>
					<AuthButton />
				</div>
				<Switch>
					<Route exact path='/' component={ MainPage } />
					<Route path='/auth/login' component={ LoginPage } />
					<Route path='/cards/:deck_id/:card_number' component= { CardPage } />
				</Switch>
			</div>
		)
	}
}

export default Base;