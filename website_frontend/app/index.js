import 'bootstrap/dist/css/bootstrap.min.css';

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App').default;

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);