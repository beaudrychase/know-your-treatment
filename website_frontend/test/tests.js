import React from 'react';
import About from './website_frontend/assets/About.js';
import MyNavbar from './website_frontend/app/components/MyNavbar.js';
import App from './App.js';

var assert = require('assert');

describe('Test About', () => {
	const wrapper = shallow(<About />);
	it('exists', () => {
		expect(wrapper.find('.spacing-div').exists()).to.eql(true);
	});
});