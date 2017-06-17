import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Auth from '../../../modules/Auth';

import LandingPage from './LandingPage.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import AddDeckPage from './AddDeckPage.jsx';
import AddCardPage from './AddCardPage.jsx';
import CardPage from './CardPage.jsx';

const AuthButton = withRouter(({ history }) => {
	function deauthAndRedirect() {
		Auth.deauthenticateUser();
		history.push('/');
	}
	return Auth.isUserAuthenticated() ? (
		<div>
			<p onClick={ () => { 
				Auth.deauthenticateUser(); 
				history.push('/'); 
			}}>Welcome</p>
			<Link to='/adddeck'>Add Deck</Link>
		</div>
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
					{ Auth.isUserAuthenticated() ? (
						<Route exact path='/' component={ MainPage } />
					) : (
						<Route exact path='/' component={ LandingPage } />
					)
					}
					<Route path='/auth/login' component={ LoginPage } />
					<Route path='/auth/signup' component={ SignUpPage } />
					<Route path='/adddeck' component={ AddDeckPage } />
					<Route path='/addcard/:deck_id' component={ AddCardPage } />
					<Route path='/cards/:deck_id/:card_number' component= { CardPage } />
				</Switch>
			</div>
		)
	}
}

export default Base;