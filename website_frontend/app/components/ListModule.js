import React from 'react';
import { ListGroup, ListGroupItem, Pagination, PaginationItem, Button } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';

export default class ListModule extends React.Component {
    constructor(props) {
        super(props);
        /*console.log(props);*/
        this.state = {
            title:      '',
            route:      '',
            names:      [],
            sort_type:  0,
            pages:      1,
            currPage:   1,
            pageArr:    [],
            sort:       ''
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
        var type = '';
        if(this.state.sort_type !== 1){
            this.setState({sort_type: 1});
            this.setState({sort: 'q={"order_by":[{"field":"name","direction":"asc"}]}&'});
            this.state.title === 'Health Conditions' ? type = 'disease' : this.state.title === 'Charities' ? type = 'charity' : type = "treatment";
            fetch('http://api.knowyourtreatment.com/api/' + type + '?q={"order_by":[{"field":"name","direction":"asc"}]}&page=' + this.state.currPage)
            .then(results => results.json())
            .then(data => {
                this.setState({names: data.objects.map((d) => {return d['name']})
                });
             });

        }
        else{
            this.setState({sort_type: 2});
            this.setState({sort: 'q={"order_by":[{"field":"name","direction":"desc"}]}&'});
            this.state.title === 'Health Conditions' ? type = 'disease' : this.state.title === 'Charities' ? type = 'charity' : type = "treatment";
            fetch('http://api.knowyourtreatment.com/api/' + type + '?q={"order_by":[{"field":"name","direction":"desc"}]}&page=' + this.state.currPage)
            .then(results => results.json())
            .then(data => {
                this.setState({names: data.objects.map((d) => {return d['name']})
                });
             });
        }
  }

    /* fetches array of names for each model  
        url -- url to fetch from
        nameLabel -- tag for the data containing the name */
    fetchArray(url, nameLabel) {
        /*console.log(url);
        console.log(nameLabel);*/
        
        fetch(url)
        .then(results => results.json())
        .then(data => {
            /*console.log(data);*/
            let tot = data.total_pages;
            let i;
            let pArr = [];
    
            for(i=1; i<=tot; i++){
                pArr.push(i);
            }
            this.setState({
                names:      data.objects.map((d) => {
                                console.log(d[nameLabel]);
                                return d[nameLabel];
                            }),
                pages:      tot,
                pageArr:    pArr
            });
        });
    }

    componentWillMount() {
        this.updatePage(1);
    }

    updatePage(pn) {
        switch (this.state.title) {
            case 'Health Conditions':
                this.fetchArray('http://api.knowyourtreatment.com/api/disease?'+ this.state.sort + 'page=' + pn, 'name');
                break;
            case 'Charities':
                this.fetchArray('http://api.knowyourtreatment.com/api/charity?'+ this.state.sort + 'page=' + pn, 'name');
                break;
            case 'Medications':
                this.fetchArray('http://api.knowyourtreatment.com/api/treatment?' + this.state.sort + 'page=' + pn, 'name');
        }
        this.setState({currPage: pn});
    }

    render() {
        return(
            <div className="container">
                <br />
                <h1> { this.state.title } </h1>

                <div className="sort-section" style={{paddingTop: '10px'}}>
                    <p>Sort &nbsp; <button className="btn btn-secondary" id='alphabet' onClick= {this.sortBy.bind(this)}>{this.state.sort_type === 1 ? "Z to A" : "A to Z"}</button></p>
                </div>

                <p><ListGroup>
                    {this.state.names.map(function(name, index) {
                        return <ListGroupItem key={index}><Link to={this.state.route + name}> {name} </Link></ListGroupItem>;
                    }, this)}
                </ListGroup></p>

                <p><Pagination>
                    Go to page &nbsp;
                    {this.state.pageArr.map(function(p, index){
                        if(this.state.currPage == p){
                            return <PaginationItem key={index}><Button disabled>{p}</Button>&nbsp;</PaginationItem>;
                        }
                        else{
                            return <PaginationItem key={index}><Button onClick={() => this.updatePage(p)}>{p}</Button>&nbsp;</PaginationItem>
                        }
                    }, this)}
                </Pagination></p>

                <hr />

                <footer className="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
            </div>
        );
    }
}