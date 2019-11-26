import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

const Main = props => {
	console.log(props);
	return (
		<Layout>
			<Navbar />
			<div className="animated fadeIn text-dark">
				<div className="my-5">
					<Link to="/recommendations">
						<div className="buttonless-green mx-auto">
							<h2>Recommend materials</h2>
						</div>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Main;
