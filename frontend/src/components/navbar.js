import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/x5gon_logo_light.svg';

const Navbar = () => {
	const [authTokens, setAuthTokens] = useState(localStorage.getItem('user'));
	return (
		<nav className="navbar navbar-expand navbar-dark bg-light fixed-top">
			<div className="navbar-brand">
				<a href="https://platform.x5gon.org" className="nav-link">
					<img src={logo} height="22px" alt="X5GON logo"></img>
				</a>
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
				<ul className="navbar-nav mr-auto">
					{window.location.pathname !== '/' ? (
						<Link className="mr-auto" to="/">
							{'< '}Go home
						</Link>
					) : null}
				</ul>
				<ul className="navbar-nav ml-auto">
					{authTokens ? (
						<>
							<Link to="/students">
								<li className="nav-item nav-link text-primary">Portal</li>
							</Link>
							<Link to="/myprofile">
								<li className="nav-item nav-link text-primary">My profile</li>
							</Link>
							<a href="/logout">
								<li className="nav-item nav-link text-primary">
									Log out? ({authTokens})
								</li>
							</a>
						</>
					) : (
						<>
							<Link to="/login">
								<li className="nav-item nav-link text-primary">Login</li>
							</Link>
							<Link to="/signup">
								<li className="nav-item nav-link text-primary">Sign up</li>
							</Link>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
