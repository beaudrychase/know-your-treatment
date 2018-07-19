import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';


class Sort extends React.Component {
  sort(field){
    this.props.sortBy(field);
  }
}

export default class ListModule extends React.Component {
    constructor(props) {
        super(props);
        /*console.log(props);*/
        this.state = {
            title: '',
            route: '',
            names: [],
            sort_type: 0
        };

        /*console.log(props.location.pathname);*/
        this.fetchArray = this.fetchArray.bind(this);

        /* Determine which list to render from location */
        switch (props.location.pathname) {

            case "/healthconditions":

                this.state.title = 'Health Conditions';
                this.state.route = '/healthconditions/'
                break;

            case "/charities":

                this.state.title = 'Charities';
                this.state.route = '/charities/';
                break;

            case "/medications":

                this.state.title = 'Medications';
                this.state.route = '/medications/';
        }

        /*console.log(this.state.title);*/
    }

    sortBy(){
        if(this.state.sort_type === 0 || this.state.sort_type === 2) {
            this.setState({sort_type: 1});
            this.setState({names: this.state.names.sort()});
        }else if(this.state.sort_type === 1)
        {
            this.setState({sort_type: 2});
            this.setState({names: this.state.names.reverse()});
        }
  }

    /* fetches array of names for each model  
        url -- url to fetch from
        nameLabel -- tag for the data containing the name */
    fetchArray(url, nameLabel) {
        /*console.log(url);
        console.log(nameLabel);*/
        
        fetch(url)
        .then(results => {
            return results.json();
        }).then(data => {
                /*console.log(data);*/
                this.setState({
                    names: data.objects.map((d) => {
                        console.log(d[nameLabel]);
                        return d[nameLabel];
                    })
                });
            });
    }

    componentWillMount() {

        switch (this.state.title) {

            case 'Health Conditions':
                this.fetchArray('http://api.knowyourtreatment.com/api/disease', 'name');
                break;

            case 'Charities':
                this.fetchArray('http://api.knowyourtreatment.com/api/charity', 'name');
                break;

            case 'Medications':
                this.fetchArray('http://api.knowyourtreatment.com/api/treatment', 'name');

        }
        
    }

    render() {
        return(
            <div class="container">
                <br />
                <h1> { this.state.title } </h1>

                <ListGroup>
                    {this.state.names.map(function(name, index) {
                        return <ListGroupItem key={index}><Link to={this.state.route + name}> {name} </Link></ListGroupItem>;
                    }, this)}
                </ListGroup>

                 <div className="sort-section" style={{paddingTop: '10px'}}>
                <button class="btn btn-secondary" id='alphabet' onClick= {this.sortBy.bind(this)}>{this.state.sort_type === 1 ? "Z to A" : "A to Z"}</button>
                </div>

                <hr />

                <footer class="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
            </div>
        );
    }
}