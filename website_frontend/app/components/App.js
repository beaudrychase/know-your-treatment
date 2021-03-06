import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import ListModule from './ListModule'
import About from './About'
import MyNavbar from './MyNavbar'
import HealthModel from './HealthModel'
import CharityModel from './CharityModel'
import MedicationModel from './MedicationModel'
import Search from './Search'
import ImageVisual from './ImageVisual'
import CharityVisual from './CharityVisual'

export default class App extends React.Component {
	render() {
		return( 
			<div>
				<MyNavbar /> 

				<Route exact path='/' component={Home}/>

				<Route exact path='/charities' component={ListModule}/>
				<Route path='/charities/:name' component={CharityModel}/>

				<Route exact path='/healthconditions' component={ListModule}/>
				<Route path='/healthconditions/:name' component={HealthModel}/>

				<Route exact path='/medications' component={ListModule}/>
				<Route path='/medications/:name' component={MedicationModel}/>

				<Route exact path='/about' component={About}/>

				<Route path='/search/:name' component={Search}/>

				<Route path='/imagevisual' component={ImageVisual}/>

				<Route path='/charityvisual' component={CharityVisual}/>
			</div>
		)
	}
}