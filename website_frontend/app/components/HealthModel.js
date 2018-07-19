import React from 'react';
import { ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
			treatments: [],
			image_link: '',
			pageList: []
		};
	}

    componentWillMount() {

        /* call api for info */
        fetch('http://api.knowyourtreatment.com/api/disease')
        .then(results => {
            return results.json();
        }).then(data => {
                /*console.log(data);*/
                /* pagination implementation: collect all names */
                this.setState({pageList: data.objects.map((d) => {

                                            if(this.state.name == d.name) {
                                                    /* gathered info for model for the page we're on*/
                                                    this.setState({

														diagnosis: d.diagnosis,
														prevention: d.prevention,
														symptoms: d.symptoms,
														transmission: d.transmission,
														treatment_text: d.treatment,
														image_link: d.image_link,
														charities: d.charities.map((c) => {
														return c.name;
														}),

														treatments: d.treatments.map((t) => {
														return t.name;
														})
													});
                                            }

                                            return d.name;

                                        }, this)
                                        
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

                    <Pagination>
                    {this.state.pageList.map(function(name, index) {
                        
                        return (this.state.name == name) ? 
                                <PaginationItem active key={index}><PaginationLink href={'/healthconditions/' + name}> {index} </PaginationLink></PaginationItem> :
                                <PaginationItem key={index}><PaginationLink href={'/healthconditions/' + name}> {index} </PaginationLink></PaginationItem>;
                                
                    }, this)}
                    </Pagination>

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