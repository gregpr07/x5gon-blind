import React from 'react';
import { Link } from 'react-router-dom';

const Signup = props => {
	return (
		<div>
			<form>
				<input type="username" placeholder="username" />
				<button>Signup</button>
			</form>
			<Link to="/login">Already have an account?</Link>
		</div>
	);
};

export default Signup;
