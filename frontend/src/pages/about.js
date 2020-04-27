import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

const About = (props) => {
	return (
		<Layout>
			<Navbar />

			<div className="px-3 my-5 pb-md-4 p-128 mx-auto text-center pt-md-0 pt-5">
				<h3 className="display-5 pb-3">Pythia learning assistant</h3>
				<p className="lead maxer-800 mx-auto">
					Recommendation engine, based on scalable, interpretable Bayesian
					Opposition based classifier.
				</p>
			</div>

			<div className="maxer-800 mx-auto px-4 px-lg-0">
				<div className="card-deck mb-3 text-center">
					<div className="card mb-4 box-shadow">
						<div className="card-header">
							<h4 className="my-0 font-weight-normal text-dark">Students</h4>
						</div>
						<div className="card-body text-muted">
							<h3 className="card-title pricing-card-title">Learn</h3>
							<ul className="list-unstyled mt-3 mb-4">
								<li>Feature</li>
								<li>Feature</li>
								<li>Feature</li>
								<li>Feature</li>
							</ul>
							<p className="m-0">
								<Link to="/signup">Sign up for free</Link>
							</p>
							<p className="mt-0 mb-2">or visit</p>
							<Link
								type="button"
								className="btn btn-lg btn-block btn-outline-primary"
								to="/students"
							>
								Student portal
							</Link>
						</div>
					</div>

					<div className="card mb-4 box-shadow">
						<div className="card-header">
							<h4 className="my-0 font-weight-normal text-dark">Teachers</h4>
						</div>
						<div className="card-body text-muted">
							<h3 className="card-title pricing-card-title">Manage</h3>
							<ul className="list-unstyled mt-3 mb-4">
								<li>Feature</li>
								<li>Feature</li>
								<li>Feature</li>
								<li>Feature</li>
							</ul>
							<p className="m-0">
								<Link to="/signup">Sign up for free</Link>
							</p>
							<p className="mt-0 mb-2">or visit</p>
							<Link
								type="button"
								className="btn btn-lg btn-block btn-outline-primary"
								to="/teachers"
							>
								Teacher portal
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default About;
