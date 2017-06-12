import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Base from './containers/Base.jsx';

ReactDOM.render(
	<BrowserRouter>
		<Base />
	</BrowserRouter>,
	document.getElementById('react-app')
);