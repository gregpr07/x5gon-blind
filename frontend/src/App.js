import React, { useContext, useState } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect
} from 'react-router-dom';
import Signup from './pages/signup';
import Main from './pages/main';
import Private from './pages/private';

const App = props => {
	const getreq = () => {
		fetch(`http://localhost:8000/api/priporocila/${authTokens}`)
			.then(res => res.json())
			.then(json => console.log(json));
	};

	const [authTokens, setAuthTokens] = useState(localStorage.getItem('user'));

	const setTokens = data => {
		if (data) {
			localStorage.setItem('user', data);
			setAuthTokens(data);
		} else {
			localStorage.removeItem('user');
			setAuthTokens(data);
		}
	};

	const Login = () => {
		const [isError, setIsError] = useState(false);
		const [userName, setUserName] = useState('');

		const postLogin = e => {
			e.preventDefault();
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
						setTokens(json);
					}
				});
		};

		if (authTokens) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<form onSubmit={e => postLogin(e)}>
					<input
						type="username"
						value={userName}
						onChange={e => {
							setUserName(e.target.value);
						}}
						placeholder="username"
					/>
					<button type="submit">Sign In</button>
				</form>

				<Link to="/signup">Don't have an account?</Link>
				{isError && <div>The username provided does not exist</div>}
			</div>
		);
	};
	const Logout = () => {
		setTokens();
		return <Redirect to="/" />;
	};

	return (
		<Router>
			<div>
				<ul>{authTokens}</ul>
				<Route exact path="/" component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/signup" component={Signup} />
				<button onClick={getreq}>getreq</button>
			</div>
		</Router>
	);
};

export default App;
