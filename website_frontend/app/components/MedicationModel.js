import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class MedicationModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
			text: '',
			healthconditions: [],
			wikilink: ''
		};
	}

	componentWillMount() {

		/* call api for info */
		fetch('http://api.knowyourtreatment.com/api/treatment?q={"filters":[{"name":"name",%20"op":"like",%20"val":"' + this.state.name + '"}]}')
		.then(results => {
			return results.json();
		}).then(data => {
				/*console.log(data);*/

				data.objects.map((d) => {

					/* gathered info for model */
					this.setState({

						text: d.text,
						wikilink: d.wiki_link,
						healthconditions: d.diseases.map((t) => {
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

					<h2> Description </h2>
					<p> {this.state.text} </p>

					{/* links to healthcondition models */}
					<h2> Related Health Conditions </h2>
					<ListGroup>
					{this.state.healthconditions.map(function(name, index) {
						return <ListGroupItem key={index}><Link to={'/healthconditions/' + name}> {name} </Link></ListGroupItem>;
					}, this)}
					</ListGroup>

					<h2> Wiki Link </h2>
					<a href={this.state.wikilink}>{this.state.wikilink}</a>
					<div>
					<Link to={'/medications'}>Back to Medications</Link>
					</div>
				</div>
		);

	}			
}