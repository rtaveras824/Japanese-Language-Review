import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import CardPage from './CardPage.jsx';

class Base extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<div>
					<Link to='/auth/login'>Login</Link>
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