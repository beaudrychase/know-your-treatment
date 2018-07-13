import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class HealthModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
			diagnosis: '',
			prevention: '',
			symptoms: '',
			transmission: '',
			treatment_text: '',
			charities: [],
			treatments: []
		};
	}

	componentWillMount() {

		/* call api for info */
		fetch('http://api.knowyourtreatment.com/api/disease?q={"filters":[{"name":"name",%20"op":"like",%20"val":"' + this.state.name + '"}]}')
		.then(results => {
			return results.json();
		}).then(data => {
				/*console.log(data);*/

				data.objects.map((d) => {

					/* gathered info for model */
					this.setState({

						diagnosis: d.diagnosis,
						prevention: d.prevention,
						symptoms: d.symptoms,
						transmission: d.transmission,
						treatment_text: d.treatment,
						charities: d.charities.map((c) => {
							return c.name;
						}),

						treatments: d.treatments.map((t) => {
							return t.name;
						})
					});

				}, this);
		    });
	}

	render() {

		return(
				<div>
					<h1> {this.state.name} </h1>;

					<h2> Diagnosis </h2>
					<p> {this.state.diagnosis} </p>

					<h2> Symptoms </h2>
					<p> {this.state.symptoms } </p>

					<h2> Prevention </h2>
					<p> {this.state.prevention} </p>

					<h2> Transmission </h2>
					<p> {this.state.transmission} </p>

					<h2> Treatment </h2>
					<p> {this.state.treatment_text} </p>]

					{/* links to medication models */}

					<ListGroup>
					{this.state.treatments.map(function(name, index) {
						return <ListGroupItem key={index}><Link to={'/medications/' + name}> {name} </Link></ListGroupItem>;
					}, this)}
					</ListGroup>

					<h2> Charities </h2>

					{/* links to charity models */}

					<ListGroup>
					{this.state.charities.map(function(name, index) {
						return <ListGroupItem key={index}><Link to={'/charities/' + name}> {name} </Link></ListGroupItem>;
					}, this)}
					</ListGroup>

					<Link to={'/healthconditions'}>Back to Health Conditions</Link>
				</div>
		);

	}			
}