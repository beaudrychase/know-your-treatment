import React from 'react';

export default class CharityModel extends React.Component {
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