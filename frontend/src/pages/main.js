import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

const Main = props => {
	const is_logged_in = props.token;
	const [available, setAvailable] = useState([]);
	useEffect(() => {
		if (is_logged_in) {
			fetch(`/api/availableclasses/`)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setAvailable(json);
				});
		}
	}, []);
	return (
		<Layout>
			<Navbar />
			<div className="animated fadeIn text-dark">
				<div className="">
					<div className="text-green mx-auto">
						<h3>Available classrooms</h3>
						<div className="mx-auto mt-4">
							{available.map(classs => (
								<Link
									to={'/classroom/' + classs.name}
									className="card card-my-classrooms mx-auto p-3 my-3 maxer-500"
									key={classs.name}
								>
									<div className="row">
										<div className="col">
											<h4 className="card-title text-dark">{classs.name}</h4>
											<h6 className="card-subtitle text-muted">
												Created by: {classs.creator}
											</h6>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Main;
