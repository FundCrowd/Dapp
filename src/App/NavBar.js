import React from 'react';
import {Link} from 'react-router-dom'
import { Navbar, NavItem, Nav, Button, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
// eslint-disable-next-line
import Classes from "./NavBar.css"
import {Categories} from "../Utilities/Constants";
import {isAddress} from "../Utilities/Metamask";

const ExploreDropdown = (props) => {
	var dropdowns = [];

	var inc = 0.0;
	for (let i in props.categories) {
		inc += 0.1;
		dropdowns.push(
			<MenuItem eventKey={inc} href={"/discover/" + props.categories[i]}>{props.categories[i]}</MenuItem>
		);
	}

	return (
		<NavDropdown eventKey={0} title="Explore" id="basic-nav-dropdown">
			{dropdowns}
		</NavDropdown>
	);
}

class SearchForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            path: "",
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event) {
    	var text = event.target.value;
    	if (text) {
    		if (isAddress(text)) {
				this.setState({"path": "/campaign/" + text})    			
    		} else {
    			this.setState({"path": "/search/" + text})
    		}
    	} else {
    		this.setState({"path": ""}) 
    	}
    }

    render() {
    	return(
    		<Navbar.Form pullLeft>
		        <FormGroup>
		          <FormControl 
		          	type="text" 
		          	placeholder="Search by Address / Title / Tags" 
		          	onChange={this.handleSearchChange}
		          />
		        </FormGroup>
		        {'   '}
		        <Button type="submit"><Link to={this.state.path}>Submit</Link></Button>
	      	</Navbar.Form>
    	)
    }
}

export const NavBar = (props) => {
	return (
	    <Navbar collapseOnSelect fixedTop style={{"background-color":"white", "marginBottom":0}}>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <Link to="/"><span className="logo">fundcrowd</span></Link>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <ExploreDropdown categories={Categories} />
		        <SearchForm />
		      </Nav>
		      <Nav pullRight>
		      	<NavItem eventKey={1}>
		      		<Button>
		      			<Link to="/start">
		      				Start a campaign
		      			</Link>
		      		</Button>
		      	</NavItem>
		      	<NavItem eventKey={2}>
		      		<Link to="/campaigns">
		      			Your Campaigns
		      		</Link>
		      	</NavItem>
		      </Nav>
		    </Navbar.Collapse>
		</Navbar>
	)
}
