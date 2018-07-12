import { Navbar,
         NavbarBrand,
         NavItem
        } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default class MyNavbar extends React.Component {
	render() {return(
        <Navbar color="dark" light expand = "md">
            <NavbarBrand href="/"> 
                <strong>Know Your Treatment</strong> 
            </NavbarBrand>
            <NavItem active>
                <Link to="/charities">Charities</Link>
            </NavItem>
            <NavItem active>
                <Link to="/healthconditions">Health Conditions</Link>
            </NavItem>
            <NavItem active>
                <Link to="/medications">Medications</Link>
            </NavItem>
            <NavItem active>
                <Link to="/about">About</Link>
            </NavItem>
        </Navbar>
	);}
}