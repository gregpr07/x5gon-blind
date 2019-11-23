import React, { useState } from 'react';
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

import logo from './images/logo/x5gon_logo_light.svg';

import './css/x5gon.css';
import './css/bootstrap.css';
import './css/search.css';
import './css/animate.css';

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

var requestLink;

if (process.env.NODE_ENV === 'production') {
	requestLink = process.env.PUBLIC_URL;
}
if (process.env.NODE_ENV === 'development') {
	requestLink = 'http://localhost:8000';
}

console.log(process.env.PUBLIC_URL);

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
		);
	};
	const Logout = () => {
		setTokens();
	};

	const Navbar = () => {
		return (
			<nav className="navbar navbar-expand navbar-light bg-light fixed-top">
				<div className="navbar-brand">
					<Link to="/" className="nav-link">
						<img src={logo} height="22px" alt="logo"></img>
					</Link>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<ul className="navbar-nav ml-auto">
						{authTokens ? (
							<>
								<li className="nav-item nav-link" onClick={Logout}>
									Log out?
								</li>
							</>
						) : (
							<>
								<Link to="/login">
									<li className="nav-item nav-link">Login</li>
								</Link>
								<Link to="/signup">
									<li className="nav-item nav-link">Sign up</li>
								</Link>
							</>
						)}
					</ul>
				</div>
			</nav>
		);
	};
	return (
		<Router basename={'inspiration'}>
			<Navbar />
			<div>
				<Route exact path="/" component={Main} />
				<Route
					path="/recommendations"
					render={props => (
						<Recommendations
							{...props}
							token={authTokens}
							requestLink={requestLink}
						/>
					)}
				/>
				<Route path="/login" component={Login} />
				<Route
					path="/signup"
					render={props => (
						<Signup {...props} token={authTokens} requestLink={requestLink} />
					)}
				/>
			</div>
		</Router>
	);
};

export default App;
