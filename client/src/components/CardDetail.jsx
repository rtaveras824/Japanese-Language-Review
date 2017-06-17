import React from 'react';

const CardDetail = ({ card, correct, changeAnswer, processAnswer }) => {
	return (
		<div>
			<img src={ card.photo_url } />
			<h1>{ card.side_a }</h1>
			{ correct && <h2>{ card.side_b }</h2> }
			<input type="text" onChange={ changeAnswer }/>
			<input type="submit" value="Submit" onClick={ processAnswer }/>
		</div>
	)
}

export default CardDetail;