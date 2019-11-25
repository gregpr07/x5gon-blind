import React from 'react';

const Layout = props => {
	return (
		<div className="full-screen bg-white text-center text-white">
			<div id="spacing-div" />
			{props.children}
		</div>
	);
};

export const TeacherLayout = props => {
	return (
		<div className="full-screen bg-blue text-center text-white">
			<div id="spacing-div" />
			{props.children}
		</div>
	);
};
export default Layout;
