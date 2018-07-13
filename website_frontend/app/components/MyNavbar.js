import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem} from 'reactstrap';

export default class MyNavbar extends React.Component {
	render() {return(
        <Navbar color="dark" light expand = "md">
            <NavbarBrand> 
                <Link to="/" style={{color:'#FFF'}}>Know Your Treatment</Link> 
            </NavbarBrand>
            <NavItem active>
                <Link to="/charities" style={{color:'#FFF'}}>Charities</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            </NavItem>
            <NavItem active>
                <Link to="/healthconditions" style={{color:'#FFF'}}>Health Conditions</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            </NavItem>
            <NavItem active>
                <Link to="/medications" style={{color:'#FFF'}}>Medications</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            </NavItem>
            <NavItem active>
                <Link to="/about" style={{color:'#FFF'}}>About</Link>
            </NavItem>
        </Navbar>
	);}
}