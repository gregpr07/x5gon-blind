import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Recommendations = props => {
	const [recc, setRecc] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const getreq = () => {
		fetch(`http://localhost:8000/api/recommendations/${props.token}`)
			.then(res => res.json())
			.then(json => {
				if (json !== 'user error') {
					setRecc(json);
				}
				console.log(json);
				setIsLoading(false);
			});
	};
	const Items = props => {
		return (
			<div>
				<ul className="searched-items">
					{props.items.map(single => (
						<div key={single.name}>
							<a href={single.url} target="blank">
								<li>{single.name}</li>
							</a>
						</div>
					))}
				</ul>
			</div>
		);
	};

	useEffect(() => {
		getreq();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Layout>
			{isLoading ? (
				<div className="loading-icon mx-auto" />
			) : recc ? (
				<Items items={recc} />
			) : (
				<div>
					<div className="text-center">It appears you are logged out</div>
					<Link to="/login">Login</Link>
				</div>
			)}
		</Layout>
	);
};

export default Recommendations;
