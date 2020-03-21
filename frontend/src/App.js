import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Signup from './pages/signup';
import Main from './pages/main';
import Recommendations from './pages/recommendations';

import Layout from './components/layout';
import Teachers from './pages/teachers';
import Logout from './pages/logout';
import Navbar from './components/navbar';

import './css/x5gon.css';
import './css/bootstrap.css';
import './css/search.css';
import './css/animate.css';

import { getCookie } from './components/functions';

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

//console.log(process.env.PUBLIC_URL + '/');

var csrftoken = getCookie('csrftoken');

const App = props => {
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
		const [password, setPassword] = useState('');

		const postLogin = e => {
			e.preventDefault();
			fetch(`/rest-auth/login/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify({
					username: userName,
					password: password
				})
			})
				.then(res => {
					if (res.status === 400) {
						throw 400;
					}
					return res.json();
				})
				.then(json => {
					console.log(json);
					setTokens(json.key);
				})
				.catch(rejection => {
					console.log(rejection);
					setIsError(true);
				});
		};

		if (authTokens) {
			window.location.href = '/';
		}

		return (
			<>
				<Navbar />
				<Layout>
					{isError ? (
						<div className="alert alert-danger">User does not exist</div>
					) : null}
					<form onSubmit={e => postLogin(e)} className="maxer-form mx-auto">
						<div className="form-group">
							<input
								className="form-control"
								type="username"
								value={userName}
								onChange={e => {
									setUserName(e.target.value);
								}}
								placeholder="username"
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								type="password"
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
								placeholder="Choose a password"
							/>
						</div>
						<button type="submit" className="button-green px-5 mb-2">
							Sign In
						</button>
					</form>

					<Link to="/signup">Don't have an account?</Link>
				</Layout>
			</>
		);
	};

	return (
		<Router>
			<Switch>
				<Route
					path="/teachers"
					render={props => <Teachers {...props} token={authTokens} />}
				/>
				<Route exact path="/" component={Main} />
				<Route exact path="/about" component={Main} />
				<Route exact path="/logout" component={Logout} />
				<Route
					path="/recommendations"
					exact
					render={props => <Recommendations {...props} token={authTokens} />}
				/>
				<Route path="/login" component={Login} exact />
				<Route
					path="/signup"
					exact
					render={props => <Signup {...props} token={authTokens} />}
				/>
				<Route>
					<div>page not found</div>
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
