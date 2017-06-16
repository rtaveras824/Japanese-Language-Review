import React from 'react';

const AddDeckForm = ({ onSubmit, onChange }) => {
	return (
		<div>
			<form action="/" onSubmit={ onSubmit }>
				<input type="text" name="name" onChange={ onChange } />
				Public <input id="cb" type="checkbox" name="public" onChange={ onChange } />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
};

export default AddDeckForm;