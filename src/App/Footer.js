import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col, Button} from 'react-bootstrap';
// eslint-disable-next-line
import Classes from "./Footer.css"
import {Categories, DonationAddress} from "../Utilities/Constants";
import {getUserAccount, transfer} from "../Utilities/Metamask"

const CategoryItems = (props) => {
	var categoryItems = [];

	for (var item in props.items) {
		categoryItems.push(
			<li><Link to={"/discover/" + props.items[item]}>{props.items[item]}</Link></li>
		);
	}
	return (
		<ul>
			{categoryItems}
		</ul>
	);
}

export const Footer = (props) => (
    <footer>
       	<hr/>
    	<Grid>
    		<Row>
    			<Col xs={6} md={4}>
			    	<strong>Categories</strong>
			    	<CategoryItems items={Categories}/>
			    </Col>
			    <Col xs={6} md={4}>
			    	<strong>Developer</strong>
			    	<ul>
			    		<li><a href="http://fundcrowd.readthedocs.io/" target="_blank" rel="noopener noreferrer">Documentation</a></li>
			    		<li><a href="https://github.com/FundCrowd" target="_blank" rel="noopener noreferrer">Source Code</a></li>
			    		<li><a href="https://gitter.im/FundCrowd-Community/Lobby" target="_blank" rel="noopener noreferrer">Gitter Chat</a></li>
			    	</ul>
			    </Col>
			    <Col xs={6} md={4}>
			    	<strong>About</strong>
			    	<ul>
			    		<li><Link to="/faq">FAQ</Link></li>
			    		<li><Link to="/team">Team</Link></li>
			    		<li><Link to="/terms-of-service">Terms of Service</Link></li>
			    		<li><Link to="/privacy">Privacy Policy</Link></li>
			    	</ul>
		    	</Col>
	    	</Row>
	    	<Row>
	    		<Col xs={14} md={10}>
	    			<Button className="donate" onClick={() => 
	    				getUserAccount()
	    				.then((address) => {
	    					transfer(address, DonationAddress)
	    					.then((result) => {
	    						console.log("succeeded")
	    					})
	    				})
	    			}>Donate</Button>
	    		</Col>
	    		<Col xs={4} md={2}>
		    		<Col xs={6} md={4}>
				    	<a href="https://medium.com/@FundCrowd" target="_blank" rel="noopener noreferrer">
				    		<img src="medium.svg" style={{width: 25}} alt="Medium"/>
				    	</a>
				    </Col>
				    <Col xs={6} md={4}>
				    	<a href="https://www.reddit.com/r/FundCrowd/" target="_blank" rel="noopener noreferrer">
				    		<img src="reddit.svg" style={{width: 25}} alt="Reddit"/>
				    	</a>
				    </Col>
				    <Col xs={6} md={4}>
				    	<a href="https://fund-crowd.slack.com" target="_blank" rel="noopener noreferrer">
				    		<img src="slack.svg" style={{width: 25}} alt="Slack"/>
				    	</a>
			    	</Col>
	    		</Col>
	    	</Row>
    	</Grid>
    	<br/>
    	<p className="text-center">Copyright &copy; {(new Date()).getFullYear()} FundCrowd LLC. All Rights Reserved.</p>
    </footer>
)