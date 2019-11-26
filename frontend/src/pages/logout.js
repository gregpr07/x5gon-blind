import React from 'react';

const Logout = props => {
	localStorage.removeItem('user');
	window.location.href = '/';
	return <div></div>;
};

export default Logout;
