import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/x5gon_logo_dark.svg';

const Navbar = () => {
	const [authTokens, setAuthTokens] = useState(localStorage.getItem('user'));
	return (
		<nav className="navbar navbar-expand navbar-light bg-dark fixed-top">
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
							<Link to="/logout">
								<li className="nav-item nav-link text-white">Log out?</li>
							</Link>
						</>
					) : (
						<>
							<Link to="/login">
								<li className="nav-item nav-link text-white">Login</li>
							</Link>
							<Link to="/signup">
								<li className="nav-item nav-link text-white">Sign up</li>
							</Link>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
