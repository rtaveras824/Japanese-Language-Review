import React, { Component } from 'react';

class Base extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div>
				<div>Base Page</div>
				{ this.props.children }
			</div>
		)
	}
}

export default Base;