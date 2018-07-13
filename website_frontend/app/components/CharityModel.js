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
                <div class="container">
                    <br />
                    <h3>{this.state.name}</h3>
                    <br />

                    <h5>Category</h5>
                    <p>{this.state.category}</p>

                    <h5>Location</h5>
                    <p>{this.state.city}, {this.state.state}</p>

                    <h5>Related Health Conditions</h5>
                    <p><Link to={'/healthconditions/' + this.state.disease}> {this.state.disease}</Link></p>
                    
                    <h5>Site Link</h5>
                    <p><a href={this.state.sitelink}>{this.state.sitelink}</a></p>
                    
                    <h5>Donate</h5>
                    <p><a href={this.state.donate}>{this.state.donate}</a></p>

                    <hr />

                    <Link to={'/charities'}>Back to Charities</Link>

                    <hr />

                    <footer class="container">
                        <p>© Know Your Treatment 2018</p>
                    </footer>
                </div>
        );

    }           
}