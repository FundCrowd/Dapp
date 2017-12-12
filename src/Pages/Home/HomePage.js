import React, {Component} from 'react';
// eslint-disable-next-line
import {Grid, Row, Col, Carousel, Thumbnail, Image, Button, Alert} from "react-bootstrap";
// eslint-disable-next-line
import Classes from "./HomePage.css"
import CampaignCard from "../Campaign/CampaignCard"
import {CampaignCreatedListener, CampaignStartedListener, CampaignFundedListener, CampaignSucceededListener, CampaignEndedListener} from "../YourCampaigns/CampaignListener";
import {convertTopicToAddress} from "../../Utilities/util";
import {Link} from "react-router-dom"

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createdCampaigns: [], 
            startedCampaigns: [], 
            fundedCampaigns: [],
            succeededCampaigns: [], 
            endedCampaigns: []
        };
    }

    componentWillMount() {
        this.queryCreated();
        this.queryStarted();
        this.queryFunded();
        this.querySucceeded();
        this.queryEnded();
    }

    queryCreated() {
        CampaignCreatedListener()
        .then((logs) => {
            var campaigns = [];
            for (var i in logs) {
                let campaign = convertTopicToAddress(logs[i].topics[1]);
                campaigns.push(campaign)
            }
            this.setState({createdCampaigns:campaigns})
        });
    }

    queryStarted() {
        CampaignStartedListener()
        .catch((error) => {
            console.log(error)
        })
        .then((logs) => {
            var campaigns = [];
            for (var i in logs) {
                let campaign = convertTopicToAddress(logs[i].topics[1]);
                campaigns.push(campaign)
            }
            this.setState({startedCampaigns:campaigns})
        });
    }

    queryFunded() {
        CampaignFundedListener()
        .then((logs) => {
            var campaigns = [];
            for (var i in logs) {
                let campaign = convertTopicToAddress(logs[i].topics[1]);
                campaigns.push(campaign)
            }
            this.setState({fundedCampaigns:campaigns})
        });
    }

    querySucceeded() {
        CampaignSucceededListener()
        .then((logs) => {
            var campaigns = [];
            for (var i in logs) {
                let campaign = convertTopicToAddress(logs[i].topics[1]);
                campaigns.push(campaign)
            }
            this.setState({succeededCampaigns:campaigns})
        });
    }

    queryEnded() {
        CampaignEndedListener()
        .then((logs) => {
            var campaigns = [];
            for (var i in logs) {
                let campaign = convertTopicToAddress(logs[i].topics[1]);
                campaigns.push(campaign)
            }
            this.setState({endedCampaigns:campaigns})
        });
    }

    render() {
        return (
            <div>
                <br />
                <Grid>
                    <Row>
                        <Alert bsStyle="warning">
                            <h4>FundCrowd Beta</h4>
                            <p>FundCrowd is currently in open beta and only available on the <strong>Ropsten Test Network</strong>.</p>
                            <p>Ensure you are using <strong>Ropsten</strong> to use the FundCrowd beta.</p>
                        </Alert>
                    </Row>
                    <h1 className="text-center">Welcome to FundCrowd</h1>
                    <h3 className="text-center">The fully-decentralized, zero-fee crowdfunding platform</h3>
                    <br />
                    <Link to="/start">
                        <Button className="center-block">
                            Start a Campaign
                        </Button>
                    </Link>
                </Grid>
                <CampaignFeature 
                    title="Newest Campaigns"
                    category="created"
                    addresses={this.state.createdCampaigns} />
                <CampaignFeature 
                    title="Started Campaigns"
                    category="started"
                    addresses={this.state.startedCampaigns} />
                <CampaignFeature 
                    title="Most Recently Contributed Campaigns"
                    category="funded"
                    addresses={this.state.fundedCampaigns} />
                <CampaignFeature 
                    title="Newest Successfully Funded Campaigns"
                    category="succeeded"
                    addresses={this.state.succeededCampaigns} />
                <CampaignFeature 
                    title="Newest Ended Campaigns"
                    category="ended"
                    addresses={this.state.endedCampaigns} />
            </div>
        )
    }
}
export default HomePage;

const CampaignFeature = (props) => {
    if (props.addresses && props.addresses.length > 0) {
        var max = (props.max ? props.max : 3);
        var campaigns = [];
        for (let i = 0; i < props.addresses.length && i < max; i++) {
            campaigns.push(
                <Col xs={7} md={4}>
                    <CampaignCard campaignAddress={props.addresses[i]} />
                </Col>
            )
        }

        return (
            <div>
                <hr />
                <Grid>
                    <h3 style={{"margin-top":"0px"}}>{props.title}</h3>
                    <Row>
                        { campaigns }
                    </Row>
                    <Link to={"/discover/" + props.category}><Button>See All</Button></Link>
                </Grid>
            </div>
        );
    } else {
        return (null)
    }
}

// eslint-disable-next-line
const BenefitsSection = (props) => {
    return (
        <section style={{"background-color":"#F8F8F8"}}>
            <Grid>
                <Row>
                    <Col xs={6} md={4} className="text-center">
                        <h5>Global Payments</h5>
                    </Col>
                    <Col xs={6} md={4} className="text-center">
                        <h5>Fully Decentralized</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4} className="text-center">
                        <h5>Easier Micropayments</h5>
                    </Col>
                    <Col xs={6} md={4} className="text-center">
                        <h5>Unfungable Contributions</h5>
                    </Col>
                    <Col xs={6} md={4} className="text-center">
                        <h5>Near-instant Funding</h5>
                    </Col>
                </Row>
            </Grid>
        </section>
    );

}