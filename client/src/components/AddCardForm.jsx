import React from 'react';

const AddCardForm = ({ onSubmit, onChange }) => {
	return (
		<div>
			<form action="/" onSubmit={ onSubmit }>
				Side A <input type="text" name="side_a" onChange={ onChange } />
				Side B <input type="text" name="side_b" onChange={ onChange } />
				Photo Url <input type="text" name="photo_url" onChange={ onChange } />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
}

export default AddCardForm;