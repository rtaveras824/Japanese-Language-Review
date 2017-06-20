import React from 'react';

const CardEditForm = ({ id, card, onChange, onSubmit, deleteCard }) => {
	return (
		<form id={ id } onSubmit={ onSubmit }>
			<input type="text" name="side_a" onChange={ onChange } value={ card.side_a } />
			<input type="text" name="side_b" onChange={ onChange } value={ card.side_b } />
			<input type="text" name="photo_url" onChange={ onChange } value={ card.photo_url } />
			<input type="submit" value="Submit" />
			<button onClick={ () => deleteCard(id) }>Delete Card</button>
		</form>
	);
}

export default CardEditForm;