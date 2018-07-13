import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class CharityModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
			city: '',
			state: '',
			sitelink: '',
			category: '',
			donate: '',
			disease: ''
		};
	}

	componentWillMount() {

		/* call api for info */
		fetch('http://api.knowyourtreatment.com/api/charity?q={"filters":[{"name":"name",%20"op":"like",%20"val":"' + this.state.name + '"}]}')
		.then(results => {
			return results.json();
		}).then(data => {
				/*console.log(data);*/

				data.objects.map((d) => {

					/* gathered info for model */
					this.setState({

						city: d.city,
						state: d.state,
						sitelink: d.url,
						category: d.category,
						donate: d.donationUrl,
						disease: d.disease.name
					});

				}, this);
		    });
	}

	render() {

		return(
				<div>
					<h1> {this.state.name} </h1>;

					<h2> Category </h2>
					<p> {this.state.category} </p>

					<h2> Location </h2>
					<p> {this.state.city}, {this.state.state} </p>


					{/* links to healthcondition models */}
					<h2> Related Health Conditions </h2>
					<Link to={'/healthconditions/' + this.state.disease}> {this.state.disease} </Link>

					<h2> Site Link </h2>
					<a href={this.state.sitelink}>{this.state.sitelink}</a>

					<h2> Donate </h2>
					<a href={this.state.donate}>{this.state.donate}</a>

					<div>
					<Link to={'/charities'}>Back to Charities</Link>
					</div>
				</div>
		);

	}			
}