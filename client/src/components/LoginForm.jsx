import React from 'react';

const LoginForm = ({
	onChange,
	onSubmit
}) => {
	return (
		<div>
			<form action="/" onSubmit={ onSubmit }>
				<input type="text" name="display_name" onChange={ onChange } placeholder="Username" />
				<input type="password" name="password" onChange={ onChange } />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default LoginForm;