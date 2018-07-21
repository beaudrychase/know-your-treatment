import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Layout} from 'reactstrap';
import "./jumbotron.css";

export default class Home extends React.Component {
    render() {return(
        <div>
            <div className="jumbotron">
                <div className="container jumbotron-inner">
                    <h1 className="display-3">Help Stop Health Problems Today</h1>
                    <p>Understand how you can help current health conditions. Browse our records for information on health conditions, charities, and medications to learn how you can help make the world a better place. </p>
                    <Link to="/charities" className="btn btn-primary">Find charities now</Link>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Health Conditions</h2>
                        <p>Learn more about current health conditions.</p>
                        <Link to="/healthconditions" className="btn btn-secondary">View Details</Link>
                    </div>
                    <div className="col-md-4">
                        <h2>Charities</h2>
                        <p>Explore which organizations are working to support health problems.</p>
                        <Link to="/charities" className="btn btn-secondary">View Details</Link>
                    </div>
                    <div className="col-md-4">
                        <h2>Medications</h2>
                        <p>Learn more about the medications and treatments available.</p>
                        <Link to="/medications" className="btn btn-secondary">View Details</Link>
                    </div>
                </div>
            </div>
            <hr />
            <footer className="container">
                <p>© Know Your Treatment 2018</p>
            </footer>
        </div>
    );}
}