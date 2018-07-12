import React from 'react';

const staticContent = (
    <div>
        <div>
            <h1 class="display-3">Help Stop Health Problems Today.</h1>
            <p>Understand how you can help current health conditions. Browse our records for information on health conditions, charities, and medications to learn how you can help make the world a better place. </p>
            <p><a href="charities">Find Charities Now</a></p>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h2>Health Conditions</h2>
                <p>Learn more about current health conditions.</p>
                <p><a href="healthconditions">View Details</a></p>
            </div>
            <div class="col-md-4">
                <h2>Charities</h2>
                <p>Explore which organizations are working to support health problems.</p>
                <p><a href="charities">View Details</a></p>
            </div>
            <div class="col-md-4">
                <h2>Medications</h2>
                <p>Learn more about the medications and treatments available.</p>
                <p><a href="medications">View Details</a></p>
            </div>
        </div>
    </div>
);

export default class Home extends React.Component {
    render() {return(staticContent);}
}