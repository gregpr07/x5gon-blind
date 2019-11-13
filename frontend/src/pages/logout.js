import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Provider } from '../context';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState('');

	const postLogin = () => {
		fetch('http://localhost:8000/api/prijava/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: userName
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json === 'error') {
					setIsError(true);
				} else {
					Provider(json);
					setLoggedIn(true);
				}
			});
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<form>
				<input
					type="username"
					value={userName}
					onChange={e => {
						setUserName(e.target.value);
					}}
					placeholder="username"
				/>
			</form>
			<button onClick={postLogin}>Sign In</button>
			<Link to="/signup">Don't have an account?</Link>
			{isError && <div>The username or password provided were incorrect!</div>}
		</div>
	);
}

export default Login;
