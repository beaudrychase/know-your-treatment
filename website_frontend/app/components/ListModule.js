import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ListModule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			names: []
		};
	}

	componentWillMount() {
		fetch('http://api.knowyourtreatment.com/api/disease')
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({names: data.objects.map((d) => {
				console.log(d.name);
				return d.name;
			})});
			/*console.log(this.state.names);*/
		})
		/*this.setState({names: nameArr});*/
	}

	render() {
		return(
			<ListGroup>
				{this.state.names.map(function(name) {
					return <ListGroupItem> { name } </ListGroupItem>;
				})}
			</ListGroup>
		);
	}
}