import React from 'react';
import {Grid, Row, Col, Image, Button, Glyphicon} from "react-bootstrap";

export const TeamPage = (props) => (
    <div>
        <TeamSection />
        <hr />
        <h2 className="text-center">Interested in joining?</h2>
        <Button
        	href="mailto:team@fundcrowd.io?Subject=Interested%20in%20joining"
        	className="center-block"
        	bsSize="large"
        	style={{"maxWidth":"12em"}}
        >
        	<span><Glyphicon glyph="envelope"/>  Let us know!</span>
        </Button>
    </div>
);

const TeamCard = (props) => {
    return (
    	<Row>
	        <Col xs={4} md={3} >
	            <Image src={props.src} 
	            circle 
	            responsive
	           	/>
	        </Col>
	        <Col xs={14} md={9}>
	        	<h2><strong>{props.name}</strong></h2>
	            <h4>{props.title}</h4>
	            <p>{props.description}</p>
	        </Col>
	    </Row>			
    );
}

const TeamSection = (props) => {
    return (
        <Grid className="padded">
        	<Row>
        		<h1>Team</h1>
        	</Row>
        	<hr />
            <TeamCard 
                src="https://avatars3.githubusercontent.com/u/2185678?s=460&v=4"
                name="Ofri Harlev" 
                title="Co-Founder / Developer"
                description="Software Engineer"
            />
            <hr />
            <TeamCard 
                src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/062/3fa/3a7310f.jpg"
                name="Alec Kriebel"
                title="Co-Founder / Developer"
                description="iOS Software Engineer"
            />
            <hr />
            <TeamCard 
                src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAflAAAAJDRiN2YzZGYxLWMzMDgtNDFjMy1iYzk2LTc3YzFhNzlhZjQyZA.jpg"
                name="Li-Xing Chang"
                title="Marketing and PR"
                description="Marketing Manager"
            />
        </Grid>
    );
}