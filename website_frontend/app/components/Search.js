import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, ButtonGroup, Layout } from 'reactstrap';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text:               props.match.params.name,
            charityResults:     [],
            diseaseResults:     [],
            treatmentResults:   [],
            completeResults:    [],
            displayCharity:     true,
            displayDisease:     true,
            displayTreatment:   true,
            natSort:            true
        };
        /*console.log('params: ' + props.match.params.name);*/

        this.makeQueries = this.makeQueries.bind(this);
        this.makeUrl = this.makeUrl.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.sort = this.sort.bind(this);
    }

    /*
        makeQueries -- calls back-end with array with search terms
        keyArray -- array of keywords to search models for
        fieldArray -- array of fields in each model to search
        stateName -- state field to put queries in
    */

    makeQueries(keyArray, fieldArray){
        var queries = keyArray.map( function( word ){
            return fieldArray.map( function( field ){
                return '{"name":"' + field + '","op":"like","val":"%' + word + '%"}';
            });
        });

        /* form the query url */

        return queries;
    }

    /* combines queries given by makeQueries into final query URL */
    /* modelName -- name of model to make search for (model defined by backend) */
    /* queries -- array of query filters to concat onto the base url */
    makeUrl(modelName, queries){
        var base = 'http://api.knowyourtreatment.com/api/' + modelName + '?q={"filters":[{"or":[';
        var i;

        for(i=0; i < queries.length; i++){
            if(i == (queries.length - 1)){
                base = base + queries[i];
            } 
            else{
                base = base + queries[i] + ',';
            }
        }

        base = base + ']}]}';
        /*console.log(base);*/

        return base;
    }

    /* calls backend api and parses results into modelResults[] */
    /* model -- name of model to search through (defined by back-end) */
    performSearch(model) {
        let search = this.state.text;
        let results = [];

        if(search != '') {
            /* Search term implementation */
            let searchArr = search.split(" ");
            let url;

            switch(model) {
                case 'charity':
                    url = this.makeUrl(model, this.makeQueries(searchArr, ['name', 'category', 'city', 'missionStatement', 'state']));
                    break;
                case 'disease':
                    url = this.makeUrl(model, this.makeQueries(searchArr, ['name', 'prevention', 'symptoms', 'transmission', 'treatment']));
                    break;
                case 'treatment':
                    url = this.makeUrl(model, this.makeQueries(searchArr, ['name', 'text', 'treatment_type']));
            }
    
            // console.log('Search url: ' + url);
    
            /* call back end and get results */
            fetch(url)
            .then(results => results.json())
            .then(data => {
                /*console.log(data);*/
                let resArr = data.objects.map((o) => o.name);
                let pages = data.total_pages;
                let i;

                if(pages == 1){
                    this.setState({ [model + 'Results']: resArr});
                }
                else{
                    for(i=2; i<=pages; i++) {
                        fetch(url + '&page=' + i)
                        .then(res => res.json())
                        .then(dat => {
                            Array.prototype.push.apply(resArr, dat.objects.map((o) => o.name));
                            // console.log('Current complete array: ' + resArr);
                            /*console.log('i iteration: ' + i);*/
                            this.setState({[model + 'Results']: resArr});
                        });
                    }                    
                }
            });
        }
    }

    componentWillMount(){
        this.performSearch('charity');
        this.performSearch('disease');
        this.performSearch('treatment');
    }

    changeFilter(model) {
        let disp = this.state['display' + model];
        disp = !disp;
        this.setState({['display' + model]: disp});
    }

    sort() {
        let cArr = this.state.charityResults;
        let dArr = this.state.diseaseResults;
        let tArr = this.state.treatmentResults;
        let ns = this.state.natSort;

        cArr.sort();
        dArr.sort();
        tArr.sort();

        if(!ns) {
            cArr.reverse();
            dArr.reverse();
            tArr.reverse();
        }

        ns = !ns;

        this.setState({charityResults: cArr, diseaseResults: dArr, treatmentResults: tArr, natSort: ns});
    }

    render(){
        return (
            <div class="container">
                <br />
                <h3>{((this.state.text == '') || ((this.state.charityResults == []) && (this.state.diseaseResults == []) && (this.state.treatmentResults == []))) ? "No Results" : "Search Results"}</h3>
                <br />
                <div class="row">
                    <div><p style={{paddingLeft: '15px'}}>
                        Show Types &nbsp;
                        <ButtonGroup>
                            <Button color="primary" onClick={() => this.changeFilter('Charity')} active={this.state.displayCharity}> Charity </Button>
                            <Button color="primary" onClick={() => this.changeFilter('Disease')} active={this.state.displayDisease}> Disease </Button> 
                            <Button color="primary" onClick={() => this.changeFilter('Treatment')} active={this.state.displayTreatment}> Treatment </Button>
                        </ButtonGroup>
                    </p></div>
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div>
                        <p>Sort &nbsp; <Button color="primary" onClick={this.sort}>{this.state.natSort ? "A to Z" : "Z to A"}</Button></p>
                    </div>
                </div>

                <hr />

                <h5>{(this.state.charityResults == []) ? "" : "Charities"}</h5>
                <hr />
                <p>{((this.state.charityResults == []) || (this.state.displayCharity == false)) ? "" : this.state.charityResults.map(function(name, index) {
                    return <p><Link key={index} to={'/charities/' + name}> {name} </Link></p>;
                })}</p>

                <hr />

                <h5>{(this.state.diseaseResults == []) ? "" : "Diseases"}</h5>
                <hr />
                <p>{((this.state.diseaseResults == []) || (this.state.displayDisease == false)) ? "" : this.state.diseaseResults.map(function(name, index) {
                    return <p><Link key={index} to={'/healthconditions/' + name}> {name} </Link></p>;
                })}</p>

                <hr />

                <h5>{(this.state.treatmentResults == []) ? "" : "Medicines"}</h5>
                <hr />
                <p>{((this.state.treatmentResults == []) || (this.state.displayTreatment == false)) ? "" : this.state.treatmentResults.map(function(name, index) {
                    return <p><Link key={index} to={'/medications/' + name}> {name} </Link></p>;
                })}</p>

                <hr />

                <footer class="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
            </div>
        );   
    }
}
