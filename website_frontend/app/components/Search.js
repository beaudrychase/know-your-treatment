import React from 'react';
import { Link } from 'react-router-dom'

export default class Search extends React.Component {
    
    constructor(props) {

        super(props);

        console.log('Route search params:' + props.match.params.term);

        this.state = {
            charityResults: [],
            diseaseResults: [],
            treatmentResults: [],
            charityQueries: [],
            diseaseQueries: [],
            treatmentQueries: [],
            charityUrl: '',
            diseaseUrl: '',
            treatmentUrl: ''
        };

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
        console.log('Statename: ' + stateName);

        this.setState({ [stateName]: queries });

        console.log('Created queries: ' + queries);

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

        console.log(base);

        this.setState({[modelName + 'Url']: base});

    }

    componentWillMount() {
        var search = this.props.match.params.term;

        console.log('The search string is ' + search);

        if(search != '') {

            /* Search term implementation */
            var searchArr = search.split(" ");

            this.makeUrl('charity', this.makeQueries(searchArr, ['name', 'category', 'city', 'missionStatement', 'state'], 'charityQueries'));

        }

    }

    componentDidMount() {
        /* call back end and get results */
        fetch(this.state.charityUrl)
        .then(results => {
            return results.json();
        }).then(data => {
                /*console.log(data);*/
                /* pagination implementation: collect all names */
                this.setState({charityResults: data.objects.map((d) => {
                                            console.log(d.name);
                                            return d.name;

                                        })
                                        
                });
            });
    }

    render() {

        if ((this.props.match.params.term == '') || ((this.state.charityResults == []) && (this.state.healthResults == []) && (this.state.treatmentResults == [])) ) {

            return <p> No Results </p>;

        } 

        else {

            return (
                    <div>
                    <p> {this.state.charityUrl} </p>
                    {this.state.charityResults.map( function(name, index) {
                                                        return <Link key={index} to={'/charities/' + name}> {name} </Link>;
                                                    }
                                               )
                    }
                     {this.state.diseaseResults.map( function(name, index) {
                                                        return <Link key={index} to={'/healthconditions/' + name}> {name} </Link>;
                                                    }
                                                )
                      }
                     {this.state.treatmentResults.map( function(name, index) {
                                                        return <Link key={index} to={'/medications/' + name}> {name} </Link>; 

                                                       }
                                                  )
                     }
                    </div>
            );
        }
    }
}
