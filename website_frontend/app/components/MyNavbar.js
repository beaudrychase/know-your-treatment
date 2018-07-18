import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavbarBrand, NavItem, Button, Input, Form, FormGroup, Nav, NavLink} from 'reactstrap';

export default class MyNavbar extends React.Component {
	render() {return(
        <Navbar color="dark" light expand = "md">
            <NavbarBrand> 
                <NavLink href="/" style={{color:'#FFF'}}>Know Your Treatment</NavLink>
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
            <NavItem active>
                <NavLink href="/healthconditions" style={{color:'#FFF', paddingRight:'20px'}}>Health Conditions</NavLink>
            </NavItem>
            <NavItem active>
                <NavLink href="/charities" style={{color:'#FFF', paddingRight:'20px'}}>Charities</NavLink>
            </NavItem>
            <NavItem active>
                <NavLink href="/medications" style={{color:'#FFF', paddingRight:'20px'}}>Medications</NavLink>
            </NavItem>
            <NavItem active>
                <NavLink href="/about" style={{color:'#FFF', paddingRight:'20px'}}>About</NavLink>
            </NavItem>
            <NavItem>
                <Form>
                    <FormGroup>
                    <Input type="search" name="search" id="search_bar" placeholder="Search for something..." />
                    </FormGroup>
                </Form>
            </NavItem>
            </Nav>
        </Navbar>
	);}
}