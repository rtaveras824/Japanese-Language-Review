class Auth {
	static authenticateUser(token) {
		localStorage.setItem('token', token);
	}

	static isUserAuthenticated() {
		var token = localStorage.getItem('token');
		if (token == null)
			return false;
		else if (token == 'undefined')
			return false;
		else
			return true;
	}

	static getToken() {
		return localStorage.getItem('token');
	}

	static deauthenticateUser() {
		localStorage.removeItem('token');
	}
}

export default Auth;