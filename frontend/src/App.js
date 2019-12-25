import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Redirect
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

var requestLink;

if (process.env.NODE_ENV === 'production') {
	requestLink = process.env.PUBLIC_URL + '/';
}
if (process.env.NODE_ENV === 'development') {
	requestLink = 'http://localhost:8000';
}

console.log(process.env.PUBLIC_URL + '/');

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

		const postLogin = e => {
			e.preventDefault();
			fetch(`${requestLink}/api/login/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
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
			<>
				<Navbar />
				<Layout>
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
						<button type="submit" className="button-green px-5 mb-2">
							Sign In
						</button>
					</form>

					<Link to="/signup">Don't have an account?</Link>
					{isError && <div>The username provided does not exist</div>}
				</Layout>
			</>
		);
	};

	return (
		<Router>
			<div>
				<Route
					path="/teachers"
					render={props => (
						<Teachers {...props} token={authTokens} requestLink={requestLink} />
					)}
				/>
				<Route exact path="/" component={Main} />
				<Route exact path="/logout" component={Logout} />
				<Route
					path="/recommendations"
					exact
					render={props => (
						<Recommendations
							{...props}
							token={authTokens}
							requestLink={requestLink}
						/>
					)}
				/>
				<Route path="/login" component={Login} exact />
				<Route
					path="/signup"
					exact
					render={props => (
						<Signup {...props} token={authTokens} requestLink={requestLink} />
					)}
				/>
			</div>
		</Router>
	);
};

export default App;
