import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
            pageList: []
        };
    }

    componentWillMount() {

        fetch('http://api.knowyourtreatment.com/api/charity')
        .then(results => {
            return results.json();
        }).then(data => {
              
                
                this.setState({pageList: data.objects.map((d) => {


                                            if(this.state.name == d.name) {
                                                 
                                                    /* get disease and image_link from object */
                                                    let dis = d.diseases.map( (d) => { return {name: d.name, image_link: d.image_link} });
                                                    let iml = dis[0].image_link;
                                                    let dn = dis[0].name;
                                                    this.setState({

                                                        city: d.city,
                                                        state: d.state,
                                                        sitelink: d.url,
                                                        category: d.category,
                                                        donate: d.donationUrl,
                                                        disease: dn,
                                                        image_link: iml
                                                    });
                                            }

                                            return d.name;

                                        }, this)
                                        
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

                    <Pagination>
                    {this.state.pageList.map(function(name, index) {
                        
                        return (this.state.name == name) ? 
                                <PaginationItem active key={index}><PaginationLink href={'/charities/' + name}> {index} </PaginationLink></PaginationItem> :
                                <PaginationItem key={index}><PaginationLink href={'/charities/' + name}> {index} </PaginationLink></PaginationItem>;
                                
                    }, this)}
                    </Pagination>

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
