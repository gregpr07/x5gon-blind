import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/x5gon_logo_light.svg';

const Layout = (props) => {
	return (
		<div className="full-screen text-center text-white">
			<div className="mb-5 mb-md-0" />
			<div className="full-screen bg-dark p-128">{props.children}</div>
			<Footer />
		</div>
	);
};

/* 
const Footer1 = () => (
	<div className="p-64 bg-light">
		<Link to="/teachers">Teachers</Link>
	</div>
); */

export const Footer = (props) => (
	<footer
		className={
			'pt-4 my-md-5 pt-md-5 text-dark px-3'
			/* (props.theme === 'dark' ? ' bg-dark' : '') */
		}
	>
		<div className="row">
			<div className="col-12 col-md">
				<a href="https://platform.x5gon.org" className="nav-link">
					<img src={logo} height="22px" alt="X5GON logo"></img>
				</a>
				<small className="d-block mb-3 text-muted"></small>
			</div>
			<div className="col-6 col-md">
				<h5>Site links</h5>
				<ul className="list-unstyled text-small">
					<li>
						<a className="text-muted" href="/">
							Home
						</a>
					</li>
					<li>
						<Link className="text-muted" to="/students">
							Students
						</Link>
					</li>
					<li>
						<Link className="text-muted" to="/teachers">
							Teachers
						</Link>
					</li>
				</ul>
			</div>

			<div className="col-6 col-md">
				<h5>Resources</h5>
				<ul className="list-unstyled text-small">
					<li>
						<Link
							className="text-muted"
							to="/static/Non_profesional_background.pdf"
						>
							Teacher guide
						</Link>
					</li>
					<li>
						<Link className="text-muted" to="/static/Technical_background.pdf">
							Technical documentation
						</Link>
					</li>{' '}
				</ul>
			</div>
			<div className="col-6 col-md"></div>
		</div>
	</footer>
);

export const TeacherLayout = (props) => {
	return (
		<div className="full-screen bg-blue text-center text-white">
			{props.children}
		</div>
	);
};
export default Layout;
