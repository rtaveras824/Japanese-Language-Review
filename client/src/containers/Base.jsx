import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from './MainPage.jsx';
import CardPage from './CardPage.jsx';

class Base extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<div>Base Page</div>
				<Switch>
					<Route exact path='/' component={ MainPage } />
					<Route path='/cards/:deck_id/:card_number' component= { CardPage } />
				</Switch>
			</div>
		)
	}
}

export default Base;