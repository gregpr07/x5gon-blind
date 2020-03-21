import React from 'react';
import { Link } from 'react-router-dom';

const Layout = props => {
	return (
		<div className="full-screen text-center text-white">
			<div className="full-screen bg-dark p-128">{props.children}</div>
			<Footer />
		</div>
	);
};

const Footer = () => (
	<div className="p-64 bg-light">
		<Link to="/teachers">Teachers</Link>
	</div>
);

export const TeacherLayout = props => {
	return (
		<div className="full-screen bg-blue text-center text-white">
			{props.children}
		</div>
	);
};
export default Layout;
