import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form, FormGroup } from 'reactstrap';

export default class Search extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            text: props.match.params.name,
            charityResults: [],
            diseaseResults: [],
            treatmentResults: []
        };

        console.log('params: ' + props.match.params.name);

        this.makeQueries = this.makeQueries.bind(this);
        this.makeUrl = this.makeUrl.bind(this);
    }

    /*
        makeQueries -- calls back-end with array with search terms
        keyArray -- array of keywords to search models for
        fieldArray -- array of fields in each model to search
        stateName -- state field to put queries in
    */

    makeQueries(keyArray, fieldArray, stateName) {
        var queries = keyArray.map( function( word ) {

                                            return fieldArray.map( function( field ) {

                                                                        return '{"name":"' + field + '","op":"like","val":"%' + word + '%"}';

                                                                    });

                                         });

        /* form the query url */

        return queries;

    }


    /* combines queries given by makeQueries into final query URL */
    makeUrl(modelName, queries) {

        var base = 'http://api.knowyourtreatment.com/api/' + modelName + '?q={"filters":[{"or":[';

        var i;
        for(i=0; i < queries.length; i++) {

            if(i == (queries.length - 1)) {

                base = base + queries[i];
            } 
            else {
                base = base + queries[i] + ',';
            }
        }

        base = base + ']}]}';

        /*console.log(base);*/

        return base;

    }

    componentWillMount() {
        let search = this.state.text;

        if(search != '') {

            /* Search term implementation */
            let searchArr = search.split(" ");

            let url = this.makeUrl('charity', this.makeQueries(searchArr, ['name', 'category', 'city', 'missionStatement', 'state'], 'charityQueries'));

            console.log('Search url: ' + url);

            /* call back end and get results */
            fetch(url)
            .then(results => { return results.json(); })
            .then(data => {
                /*console.log(data);*/
        
                this.setState({charityResults: data.objects.map((d) => {
                                console.log(d.name);
                                return d.name;
                            })
                                        
                });
            });
        }
    }

    render() {

        return (
                <div>
                Search Results:

                {this.state.charityResults.map(function(name, index) {
                    return <p><Link to={'/charities/' + name}> {name} </Link></p>;
                })}

                </div>
        );   
    }
}
