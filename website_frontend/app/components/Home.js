import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    render() {return(
        <div>
            <div>
                <h1 class="display-3">Help Stop Health Problems Today.</h1>
                <p>Understand how you can help current health conditions. Browse our records for information on health conditions, charities, and medications to learn how you can help make the world a better place. </p>
                <Link to="/charities">Find charities now</Link>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <h2>Health Conditions</h2>
                    <p>Learn more about current health conditions.</p>
                    <Link to="/healthconditions">View Details</Link>
                </div>
                <div class="col-md-4">
                    <h2>Charities</h2>
                    <p>Explore which organizations are working to support health problems.</p>
                    <Link to="/charities">View Details</Link>
                </div>
                <div class="col-md-4">
                    <h2>Medications</h2>
                    <p>Learn more about the medications and treatments available.</p>
                    <Link to="/medications">View Details</Link>
                </div>
            </div>
            <footer class="container">
                <p>© Know Your Treatment 2018</p>
            </footer>
        </div>
    );}
}