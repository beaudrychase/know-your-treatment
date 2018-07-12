import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ListModule extends React.Component {
	constructor(props) {
		super(props);
		/*console.log(props);*/
		this.state = {
			title: '',
			names: []
		};

		console.log(props.location.pathname);
		this.fetchArray = this.fetchArray.bind(this);

		/* Determine which list to render from location */
		switch (props.location.pathname) {

			case "/healthconditions":

				this.state.title = 'Health Conditions';
				break;

			case "/charities":

				this.state.title = 'Charities';
				break;

			case "/medications":

				this.state.title = 'Medications';
		}

		console.log(this.state.title);
	}

	/* fetches array of names for each model  
		url -- url to fetch from
		nameLabel -- tag for the data containing the name */
	fetchArray(url, nameLabel) {
		var Arr = ['1', '2', '3'];
		
		/*
		fetch(url)
		.then(results => {
			return results.json();
		}).then(data => {
			
			Arr = data.objects.map((d) => {
				
				return d.data[nameLabel];
			});
			
		})
		*/

		console.log(Arr);
		return Arr;
	}

	componentWillMount() {

		switch (this.state.title) {

			case 'Health Conditions':
				this.setState({names: this.fetchArray('http://api.knowyourtreatment.com/api/disease', 'name')});
				break;

			case 'Charities':
				this.setState({names: this.fetchArray('http://api.knowyourtreatment.com/api/charity', 'charityName')});
				break;

			case 'Medications':
				this.setState({names: this.fetchArray('http://api.knowyourtreatment.com/api/treatment', 'name')});

		}
		
	}

	render() {
		return(
			<div>
				<h1> { this.state.title } </h1>
				<ListGroup>
					{this.state.names.map(function(name, index) {
						return <ListGroupItem key={index}> { name } </ListGroupItem>;
					})}
				</ListGroup>
			</div>
		);
	}
}