import React from 'react';

export default class HealthModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name
		};
	}

	render() {
		return <h1> {this.state.name} </h1>;
	}
}