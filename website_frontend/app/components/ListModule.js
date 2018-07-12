import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class ListModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: []
        };
    }

    componentWillMount() {
        fetch('http://api.knowyourtreatment.com/api/disease')
        .then(results => results.json())
        .then(apiData => this.setState({
            names: apiData.objects.map((element) => element.name)
        }));
    }

    render() {
        return(
            <ListGroup>
                {this.state.names.map(function(element) {
                    return <ListGroupItem> {element} </ListGroupItem>;
                })}
            </ListGroup>
        );
    }
}