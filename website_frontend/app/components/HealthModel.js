import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class HealthModel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.match.params.name,
			diagnosis:       '',
			prevention:      '',
			symptoms:        '',
			transmission:    '',
			treatment_text:  '',
			charities:       [],
			treatments:      [],
			image_link:      ''
		};
	}

    componentWillMount() {
        /* call api for info */
        fetch('http://api.knowyourtreatment.com/api/disease?q={"filters":[{"name":"name", "op":"eq", "val":"' + this.state.name + '"}]}')
        .then(results => { return results.json(); })
        .then(data => {
            let hobj = data.objects[0];
            this.setState({
            	diagnosis:         hobj.diagnosis,
            	prevention:        hobj.prevention,
            	symptoms:          hobj.symptoms,
            	transmission:      hobj.transmission,
            	treatment_text:    hobj.treatments[0].text,
            	charities:         hobj.charities.map((c) => c.name),
            	treatments:        hobj.treatments.map((t) => t.name),
            	image_link:        hobj.image_link
            });
        });
    }

	render() {
		return(
			<div class="container">
                <br />
				<h3>{this.state.name}</h3>
                <br />

				<div class="container">
					<img src={this.state.image_link} width="400" height="auto" class="rounded mx-auto d-block img-fluid"/>
				</div>

				<h5>Diagnosis</h5>
				<p>{(this.state.diagnosis === '' || this.state.diagnosis === null) ? "No data available." : this.state.diagnosis}</p>

				<h5>Symptoms</h5>
				<p>{(this.state.symptoms === '' || this.state.symptoms === null) ? "No data available." : this.state.symptoms }</p>

				<h5>Prevention</h5>
				<p>{(this.state.prevention === '' || this.state.prevention === null) ? "No data available." : this.state.prevention}</p>

				<h5>Transmission</h5>
				<p>{(this.state.transmission === '' || this.state.transmission === null) ? "No data available." : this.state.transmission}</p>

				<h5>Treatment</h5>
				<p>{(this.state.treatment_text === '' || this.state.treatment_text === null) ? "No data available." : this.state.treatment_text}</p>
				<ListGroup>
				{this.state.treatments.map(function(name, index) {
					return <ListGroupItem key={index}><Link to={'/medications/' + name}> {name} </Link></ListGroupItem>;
				}, this)}
				</ListGroup>
                <br />

				<h5>Charities</h5>
				<ListGroup>
				{this.state.charities.map(function(name, index) {
					return <ListGroupItem key={index}><Link to={'/charities/' + name}> {name} </Link></ListGroupItem>;
				}, this)}
				</ListGroup>
                <br />

                <hr />

				<Link to={'/healthconditions'}>Back to Health Conditions</Link>

                <hr />

                <footer class="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
			</div>
		);
	}
 }			