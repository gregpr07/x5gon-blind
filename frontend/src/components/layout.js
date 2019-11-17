import React from 'react';

const Layout = props => {
	return (
		<div className="full-screen bg-dark text-center text-white">
			<div id="spacing-div" />
			{props.children}
		</div>
	);
};

export default Layout;
