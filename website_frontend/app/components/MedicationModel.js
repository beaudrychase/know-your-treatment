import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class MedicationModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            text: '',
            healthconditions: [],
            wikilink: '',
            image_link: ''
        };
    }

    componentWillMount() {

        /* call api for info */
        fetch('http://api.knowyourtreatment.com/api/treatment?q={"filters":[{"name":"name",%20"op":"like",%20"val":"' + this.state.name + '"}]}')
        .then(results => {
            return results.json();
        }).then(data => {
                /*console.log(data);*/

                data.objects.map((d) => {

                    /* gathered info for model */
                    this.setState({

                        text: d.text,
                        wikilink: d.wiki_link,
                        image_link: d.image_link,
                        healthconditions: d.diseases.map((t) => {
                            return t.name;
                        })
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

                    <div className="container">
                        <img src={this.state.image_link} width="400" height="auto"
                             className="rounded mx-auto d-block img-fluid"/>
                    </div>

                    <h5>Description</h5>
                    <p>{(this.state.text === '' || this.state.text === null) ? "No data available." : this.state.text}</p>

                    <h5>Related Health Conditions </h5>
                    <ListGroup>
                    {this.state.healthconditions.map(function(name, index) {
                        return <ListGroupItem key={index}><Link to={'/healthconditions/' + name}> {name} </Link></ListGroupItem>;
                    }, this)}
                    </ListGroup>
                    <br />

                    <h5>Wiki Link</h5>
                    <a href={this.state.wikilink}>{this.state.wikilink}</a>

                    <hr />

                    <Link to={'/medications'}>Back to Medications</Link>
                    
                    <hr />
                    
                    <footer class="container">
                        <p>© Know Your Treatment 2018</p>
                    </footer>
                </div>
        );

    }           
}