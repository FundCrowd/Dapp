import React from 'react';
import {Grid, Row, Col, Thumbnail, ProgressBar} from 'react-bootstrap';
import {isCampaign, isAddress} from "../../Utilities/Metamask"
import Campaign from "./Campaign"
import {Link} from "react-router-dom";

class CampaignCard extends React.Component {
    constructor(props) {
        super(props);
        this.campaignAddress = this.props.campaignAddress;
        this.campaign = new Campaign(this.campaignAddress);
        this.state = {
        	isCampaign: null,
        	goal: null, 
        	deadline: null, 
        	creator: null,
        	stage: null,
        	title: null, 
        	description: null,
        	image: null, 
        	total: null
            // isCampaign: true,
            // goal: 690000000, 
            // deadline: 1510296874*1000, 
            // creator: 0x79206BCcF7Afd0261444920f1178FEd59F5eB087,
            // stage: 1,
            // title: "Save the Whales", 
            // description: "A campaign to save the whales of the great blue sea.",
            // image: "http://cdn.natgeotv.com.au/factsheets/thumbnails/UnderstandingTheBlueWhale_whale.jpg?v=27&azure=false&scale=both&width=1600&height=900&mode=crop", 
            // total: 60000
        };
    }

    fetchCampaignInfo() {
        this.campaign.getGoal((result) => {
            this.setState({goal:result})
        })
        this.campaign.getDeadline((result) => {
            this.setState({deadline:result*1000})
        })
        this.campaign.getCreator((result) => {
            this.setState({creator:result}) // unsure if needed
        })
        this.campaign.getStage((result) => {
            this.setState({stage: result}) // unsure if needed
        })
        this.campaign.getTotal((result) => {
            this.setState({total: result}) // unsure if needed
        })

        this.campaign.getAttribute("title", (result) => {
            this.setState({title: result})
        })
        this.campaign.getAttribute("image", (result) => {
            this.setState({image: result})
        })
        this.campaign.getAttribute("description", (result) => {
            this.setState({description: result})
        })
    }

    componentWillMount() {
        isCampaign(this.campaignAddress)
            .catch((error) => {
                console.log(error)
                this.setState({isCampaign: false})
            }).then((value) => {
                if (!value) {
                    this.setState({isCampaign: false})
                } else {
                    this.setState({isCampaign: value[0]})
                    if (value[0]) {
                        this.fetchCampaignInfo()
                    }
                }
            });
    }

    render() {
        if (!isAddress(this.campaignAddress) || this.state.isCampaign === false) {
            return (null)
    	} else if (this.state.isCampaign == null) {
    		return (
    			null
    		);
    	} else {
            // Description max length
            let description = this.state.description;
            if  (description != null) {
                description = description.substring(0, 136); // 140 chars
                if (description.length >= 136)
                    description = description + "..."
            }
	        return (
                <Link to={"/campaign/" + this.campaignAddress} className="campaign-card">
                <br />
    		      <Thumbnail src={this.state.image} style={{"width":"21em"}}>
    		        <h5 className="address" style={{"width":"19em"}}>{this.state.title ? this.state.title : this.campaignAddress}</h5>
    		        <p>{description}</p>
    		       	<br />
    		       	<ProgressBar now={(this.state.total/this.state.goal)*100}/>
    		        <Grid style={{"width":"21em", "paddingLeft":"0px"}}>
    		        	<Row>
    		        		<Col xs={6} md={4}>
    		        			<strong>{((this.state.total/this.state.goal)*100).toFixed(2)} %</strong> 
    		        			<p>Funded</p>
    		        		</Col>
    		        		<Col xs={6} md={4} style={{"paddingLeft":"0px"}}>
    		        			<strong>{this.state.total} ETH</strong>
    		        			<p>Contributed</p>
    		        		</Col>
    		        		<Col xs={6} md={4} style={{"paddingLeft":"0px"}}>
    		        			<strong>{(new Date(this.state.deadline)).toLocaleDateString()}</strong>
    		        			<p>days to go</p>
    		        		</Col>
    		        	</Row>
    		        </Grid>
    		      </Thumbnail>
                </Link>
	        );
        }
    }
}

export default CampaignCard;