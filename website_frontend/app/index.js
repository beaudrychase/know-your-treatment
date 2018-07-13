import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App').default;

ReactDOM.render((
	<BrowserRouter>
    	<App />
	</BrowserRouter>
	), document.getElementById('app')
);