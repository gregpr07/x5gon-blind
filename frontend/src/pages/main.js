import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Main = props => {
	console.log(props);
	return (
		<Layout>
			<div className="animated fadeIn">
				<h3 className="font-weight-bold">Recommender</h3>
				<div className="my-5">
					<Link to="/recommendations">
						<div className="button-green mx-auto">Recommend stuff</div>
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Main;
