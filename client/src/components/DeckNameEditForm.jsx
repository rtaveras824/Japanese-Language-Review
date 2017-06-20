import React from 'react';

const DeckNameEditForm = ({ name, onChange, onSubmit }) => {
	return (
		<div>
			<input type="text" name="name" value={ name } onChange={ onChange } />
			<button onClick={ onSubmit }>Submit</button>
		</div>
	)
}

export default DeckNameEditForm;