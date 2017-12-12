import React from 'react';
import {Grid, Row, Col, Button, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Loading} from "../../App/Loading";
import {CampaignCreatedListener} from "./CampaignListener";
import {getUserAccount} from "../../Utilities/Metamask";
import {convertTopicToAddress} from "../../Utilities/util";

class YourCampaignsPage extends React.Component {
	constructor(props) {
		super(props);
		this.txHash = props.txHash;
		this.state = {
			"campaigns": null,
			'userAddress': null
		};

		this.createCampaignRows = this.createCampaignRows.bind(this);
	}

	componentWillMount() {
		getUserAccount()
			.then((account) => {
				this.setState({userAddress: account});
				if (account !== undefined)
	            	return CampaignCreatedListener(account);
	            else 
	            	return null
	        })
            .then( (logs) => {
                var campaigns = [];
                for (var i in logs) {
                    let campaign = convertTopicToAddress(logs[i].topics[1]);
                    campaigns.push(campaign)
                }
                this.setState({campaigns:campaigns})
            });
	}

	createCampaignRows() {
		let rows = [];
		for (let i in this.state.campaigns) {
			rows.push(<CampaignRow address={this.state.userAddress} campaignAddress={this.state.campaigns[i]} userAddress={this.state.userAddress} />)
		}
		return rows;
	}

	render() {

		if (this.state.campaigns === null) {
			return (
				<Loading />
			);
		} else if (this.state.userAddress === undefined) {
			return (
				<NoCampaigns />
			);
		} else {
			if (this.state.campaigns.length > 0) {
				return (
					<Grid>
						<br />

						{this.txHash !== undefined &&
                            <Alert bsStyle="success"><strong>Success!</strong> Your campaign has been submitted. You can view the transaction <a href={"https://ropsten.etherscan.io/tx/" + this.txHash} target="_blank">here</a>.</Alert>
                        }

						<h2>Campaigns created by {this.state.userAddress}</h2>
						{this.createCampaignRows()}
					</Grid>
				);
			} else {
				return (
					<NoCampaigns />
				);
			}
		}
	}
}

export default YourCampaignsPage;

const CampaignRow = (props) => {
	return (
		<Row>
			<hr />
			<Col xs={12} md={8} >
				<h3><Link to={"/campaign/" + props.campaignAddress}>{props.campaignAddress}</Link></h3>
			</Col>
			<Col xs={6} md={4} >
				<Link to={"/edit/" + props.campaignAddress}>
					<Button
						disabled={(props.userAddress == null || props.address.toLowerCase() !== props.userAddress.toLowerCase())}
						className="pull-right"
					>
						Edit Campaign
					</Button>
				</Link>
			</Col>
			<hr />
		</Row>
	);
}

const NoCampaigns = (props) => (
	<div>
		<br />
		<h1 className="text-center">You haven't started any campaigns yet.</h1>
		<br />
		<Link to="/start">
			<Button 
				className="center-block"
				bsSize="large">
				Start a Campaign
			</Button>
		</Link>
		<br />
	</div>
)