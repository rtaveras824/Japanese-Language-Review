import React from 'react';

const SignUpForm = ({
		onSubmit,
		onChange
	}) => {
		return (
			<div>
				<form action="/" onSubmit={ onSubmit }>
					<input type="text" name="display_name" onChange={ onChange } />
					<input type="password" name="password" onChange={ onChange } />
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
};

export default SignUpForm;