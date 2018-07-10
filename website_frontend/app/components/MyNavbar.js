import { Navbar,
         NavbarBrand,
         NavItem,
         NavLink
        } from 'reactstrap';

var React = require('react');

export default class MyNavbar extends React.Component {
	render() {
		return (
                        <Navbar color="dark" light expand = "md">

                        <NavbarBrand href="/"> 
                                <strong>Know Your Treatment</strong> 
                        </NavbarBrand>


                        <NavItem active>
                                <NavLink to="#">Home</NavLink>
                        </NavItem>

                        <NavItem active>
                                <NavLink to="#">About</NavLink>
                        </NavItem>

                        <NavItem active>
                                <NavLink to="#">Charities</NavLink>
                        </NavItem>

                        <NavItem active>
                                <NavLink to="#">Health Conditions</NavLink>
                        </NavItem>

                        <NavItem active>
                                <NavLink to="#">Medications</NavLink>
                        </NavItem>
                        </Navbar>
		);
	}
}