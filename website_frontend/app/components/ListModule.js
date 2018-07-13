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
		fetch("https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4")
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({names: data.map((d) => {
				return d.title;
			})});
		})
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