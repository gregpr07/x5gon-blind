import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Recommendations = props => {
	const [recc, setRecc] = useState([]);

	console.log(props);
	const getreq = () => {
		fetch(`http://localhost:8000/api/recommendations/${props.token}`)
			.then(res => res.json())
			.then(json => console.log(json));
	};
	return (
		<div>
			Your recommendations
			<button onClick={getreq}>getreq</button>
		</div>
	);
};

export default Recommendations;
