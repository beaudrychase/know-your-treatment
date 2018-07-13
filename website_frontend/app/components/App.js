import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import ListModule from './ListModule';
import About from './About';
import MyNavbar from './MyNavbar';

export default class App extends React.Component {
	render() {
		return( 
			<div>
				<MyNavbar /> 

				<Route exact path='/' component={Home}/>
				<Route path='/charities' component={ListModule}/>
				<Route path='/healthconditions' component={ListModule}/>
				<Route path='/medications' component={ListModule}/>
				<Route path='/about' component={About}/>
			</div>
		);
	}
}