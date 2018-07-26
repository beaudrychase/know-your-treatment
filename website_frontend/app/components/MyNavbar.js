import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavItem, Nav, NavLink, Input, InputGroup } from 'reactstrap';

export default class MyNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        console.log('Search Value: ' + e.target.value);
        this.setState({searchText: e.target.value});
    }

	render() {

        return (
            <Navbar color="dark" light expand = "md">
                <NavbarBrand href="/" style={{color:'#FFF'}}> 
                    Know Your Treatment
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

                <NavItem active>
                    <NavLink href="/imagevisual" style={{color:'#FFF', paddingRight:'20px'}}>Image Visual</NavLink>
                </NavItem>

                <NavItem active>
                    <NavLink href="/charityvisual" style={{color:'#FFF', paddingRight:'20px'}}>Charity Visual</NavLink>
                </NavItem>

                {/* Search bar */}
                <NavItem active>
                    <InputGroup>
                        <Input placeholder="Search for something..." onChange={this.handleSearch}/>
                    </InputGroup>
                </NavItem>

                <NavItem>
                    <Link to={'/search/' + this.state.searchText}  className="btn btn-primary">Search</Link>
                </NavItem>
                </Nav>
            </Navbar>
        );
    }
}