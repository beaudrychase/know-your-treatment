import React from 'react';
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
            disease: '',
            image_link: '',
        };
    }

    componentWillMount() {

        fetch('http://api.knowyourtreatment.com/api/charity?q={"filters":[{"name":"name", "op":"eq", "val":"' + this.state.name + '"}]}')
        .then(results => { return results.json(); })
        .then(data => {
                let cobj = data.objects[0];
                this.setState({
                    city: cobj.city,
                    state: cobj.state,
                    sitelink: cobj.url,
                    category: cobj.category,
                    donate: cobj.donationUrl,
                    disease: cobj.diseases[0].name,
                    image_link: cobj.diseases[0].image_link
                });
        });
    }

    render() {

        console.log('State' + this.state.state);

        return(
                <div class="container">
                    <br />
                    <h3>{this.state.name}</h3>
                    <br />

                    <div className="container">
                        <img src={this.state.image_link} width="400" height="auto"
                             className="rounded mx-auto d-block img-fluid"/>
                    </div>

                    <h5>Category</h5>
                    <p>{(this.state.category === '' || this.state.category === null) ? "No data available." : this.state.category}</p>

                    <h5>Location</h5>
                    <p>{(this.state.city === '' || this.state.city === null) ? "No data available." : this.state.city}, {(this.state.state === '' || this.state.state === null) ? "No data available." : this.state.state}</p>

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
