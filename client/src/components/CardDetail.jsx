import React from 'react';

const CardDetail = ({ card, correct, changeAnswer, processAnswer }) => {
	return (
		<div>
			<img src={ card.photoUrl } />
			<h1>{ card.sideA }</h1>
			{ correct && <h2>{ card.sideB }</h2> }
			<input type="text" onChange={ changeAnswer }/>
			<input type="submit" value="Submit" onClick={ processAnswer }/>
		</div>
	)
}

export default CardDetail;