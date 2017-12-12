import React, {Component} from 'react';
import {Grid, Row, Col, PageHeader, ProgressBar, Image, Glyphicon, ResponsiveEmbed} from "react-bootstrap";
import {getUserAccount, isCampaign} from "../../Utilities/Metamask"
import ContributeModal from "./ContributeModal";
import {Loading} from "../../App/Loading";
import Campaign from "./Campaign";
import CampaignNotFound from "../../App/CampaignNotFound";
import CampaignButton from "../../App/CampaignButton";
import {MainSiteTitle} from "../../Utilities/Constants"

class CampaignPage extends Component {
    constructor(props) {
        super(props);
        this.campaignAddr = this.props.campaignAddr
        this.campaign = new Campaign(this.campaignAddr);
        this.state = {
            currentAddress:null,
            showContribute: false,
            isCampaign: null,
        	goal: null,
        	deadline: null,
            title: null,
            category: null,
            country: null,
            image: null, 
            video: null,
            description: null,
            risks: null, 
            website: null, 
            // rewards: [], 
            totalContributions: null,
            creator: null, 
            stage: 1,
         // 	goal: 6900,
        	// deadline: 1536479985,
         //    totalContributions: 420,
         //    creator: "0xE993250c8f347CC68887d6C81f069D5852CCB4b3",
         //    title: "Alec's Amazing Campaign to Save the Whales",
         //    category: "Charity",
         //    country: "US",
         //    image: "http://cdn.natgeotv.com.au/factsheets/thumbnails/UnderstandingTheBlueWhale_whale.jpg?v=27&azure=false&scale=both&width=1600&height=900&mode=crop", 
         //    video: "https://www.youtube.com/embed/vAaHUg0wSzo",
         //    video: "https://player.vimeo.com/video/68465648",
         //    description: "Help us save the whales! Many whales are caught illegally and killed. Contribute to this campaign to save the whales and get some great prizes!",
         //    risks: "Whales don't accept FundTokens as a form of currency.", 
         //    website: "https://whales.com/", 
         //    rewards: [{
         //    	"title": "Whale Pack 1",
         //    	"amount": 1,
         //    	"description": "This gets you a virtual hug from a whale. What a whale of a tale!",
         //    	"limit": 69
         //    	}
         //    ]
        };
    };

    // Modal Methods

    toggleContribute = () => {
        if (this.state.showContribute)
            this.setState({showContribute:false});
        else
            this.setState({showContribute:true})
    };

    // View Lifecycle

    fetchCampaignInfo() {
        this.campaign.getGoal((result) => {
            this.setState({goal:result})
        });
        this.campaign.getDeadline((result) => {
            this.setState({deadline:result*1000}) // *1000 to convert s to ms
            console.log(result)
        });
        this.campaign.getCreator((result) => {
            this.setState({creator:result})
        });
        this.campaign.getStage((result) => {
            this.setState({stage: result})
        });
        this.campaign.getTotal((result) => {
            this.setState({totalContributions: result})
        });
        this.campaign.getAttribute("title", (result) => {
            this.setState({title: result})
        });
        this.campaign.getAttribute("image", (result) => {
            this.setState({image: result})
        });
        this.campaign.getAttribute("video", (result) => {
            this.setState({video: result})
        });
        this.campaign.getAttribute("description", (result) => {
            this.setState({description: result})
        });
        this.campaign.getAttribute("category", (result) => {
            this.setState({category: result})
        });
        this.campaign.getAttribute("country", (result) => {
            this.setState({country: result})
        });
        this.campaign.getAttribute("risks", (result) => {
            this.setState({risks: result})
        });
        this.campaign.getAttribute("website", (result) => {
            this.setState({website: result})
        })
    }

    componentWillMount() {
        getUserAccount()
            .then((account) => {
                this.setState({currentAddress:account})
            });

        isCampaign(this.campaignAddr)
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

    componentWillUnmount() {
        document.title = MainSiteTitle;
    }

    render() {
        document.title = (this.state.title ? this.state.title : this.campaignAddr) + " Campaign | FundCrowd"
        if (this.state.isCampaign != null) {
            if (this.state.isCampaign) {
                return (
                    <div>
                        <br />
                        <Grid>
                            <TopRow 
                                campaignAddr={this.props.campaignAddr} 
                                title={this.state.title} 
                                creator={this.state.creator} 
                            />
                            <SecondRow 
                                video={this.state.video}
                                image={this.state.image}
                                country={this.state.country}
                                category={this.state.category}
                                totalContributions={this.state.totalContributions}
                                goal={this.state.goal}
                                deadline={this.state.deadline}
                                creator={this.state.creator}
                                stage={this.state.stage}
                                currentAddress={this.state.currentAddress}
                                campaign={this.campaign}
                                contribute={this.toggleContribute}
                            />
                            <ThirdRow
                                description={this.state.description}
                                risks={this.state.risks}
                            />
                        </Grid>
                        <ContributeModal 
                            title={this.state.title}
                            campaignAddr={this.campaignAddr}
                            showModal={this.state.showContribute}
                            toggleContribute={this.toggleContribute}
                            campaign={this.campaign}
                        />
                    </div>
                );
            } else {
                return (
                    <CampaignNotFound />
                );
            }
        } else {
            return (
                <Loading />
            );
        }
    }
}

export default CampaignPage;

// Consists of a dynamic header row containing title and creator of the campaign
const TopRow = (props) => {
    var correctTitle = (props.title != null) ? props.title : props.campaignAddr;

    return (
        <Row>
            <Col xs={3} md={2}>
                <p className="address col-xs-12 text-left">By <strong><a href={"https://etherscan.io/address/" + props.creator}>{props.creator}</a></strong></p>
            </Col>
             <Col xs={15} md={10}>
                <PageHeader>{correctTitle}</PageHeader>
            </Col>
        </Row>
    );
}

// Creates the main media, either the image or video
const MainMedia = (props) => {
    if (props.video != null) {
        return (
            <ResponsiveEmbed a16by9>
                <embed src={props.video} />
            </ResponsiveEmbed>
        );
    } else if (props.image != null) {
        return(<Image src={props.image} responsive />);
    }
    return (<div/>);
};

// The main source of information. All info in this element is required
const InfoPanel = (props) => {
    const now = new Date()

    // TODO: check if days < deadline, this means its ended
    const days = Math.floor((props.deadline - now)/8.64e7);
    const deadline = new Date(props.deadline)

    if (props.fullWidth) {
        return (
            <Grid>
                <ProgressBar now={(props.totalContributions/props.goal)*100}/>
                <Row>
                    <Col xs={6} md={4}>
                        <h3 className="text-center">{props.totalContributions} ETH</h3>
                        <p className="text-center">pledged of {props.goal} ETH goal</p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h3 className="text-center">0</h3>
                        <p className="text-center">backers</p>
                    </Col>
                    <Col xs={6} md={4}>
                        <h3 className="text-center">{days}</h3>
                        <p className="text-center">days to go</p>
                    </Col>
                </Row>
                <CampaignButton 
                    stage={props.stage} 
                    deadline={props.deadline} 
                    creator={props.creator} 
                    currentAddress={props.currentAddress} 
                    campaign={props.campaign}
                    contribute={props.contribute}/>
                <br/>
                <p>This project will only be funded if it reaches its goal by {deadline.toLocaleString()}</p>
            </Grid>
        );
    } else {
        return (
            <div>
                <ProgressBar now={(props.totalContributions/props.goal)*100}/>
                <h3>{props.totalContributions} ETH</h3>
                <p>pledged of {props.goal} ETH goal</p>
                <h3>0</h3>
                <p>backers</p>
                <h3>{days}</h3>
                <p>days to go</p>
                <CampaignButton 
                    stage={props.stage} 
                    deadline={props.deadline} 
                    creator={props.creator} 
                    currentAddress={props.currentAddress} 
                    campaign={props.campaign}
                    contribute={props.contribute}/>                
                    <br/>
                <p>This project will only be funded if it reaches its goal by {deadline.toLocaleString()}</p>
            </div>  
        );
    }
}

// A quick list of info/attributes about the campaign
const CampaignInfo = (props) => {
    var info = [];
    if (props.country != null) {
        info.push(<span><Glyphicon glyph="map-marker"/> {props.country} </span>)
    }
    if (props.category != null) {
        info.push(<span><Glyphicon glyph="tag"/> {props.category}</span>)
    }

    return (
        <div>
            <br/>
            <span>{info}</span>
        </div>
    );
}

const SecondRow = (props) => {
    if (props.video == null && props.image == null) {
        return (
        <Row>
            <Col>
                <InfoPanel 
                    totalContributions={props.totalContributions}
                    goal={props.goal}
                    deadline={props.deadline}
                    stage={props.stage}
                    creator={props.creator}
                    currentAddress={props.currentAddress}
                    fullWidth={true}
                    campaign={props.campaign}
                    contribute={props.contribute}
                />
                <CampaignInfo category={props.category} country={props.country} />
            </Col>
        </Row> 
        );
    } else {
        return (
        <Row>
            <Col xs={12} md={8}>
                <MainMedia video={props.video} image={props.image}/>
                <CampaignInfo category={props.category} country={props.country} />
            </Col>
            <Col xs={6} md={4}>
                <InfoPanel 
                    totalContributions={props.totalContributions}
                    goal={props.goal}
                    deadline={props.deadline}
                    stage={props.stage}
                    creator={props.creator}
                    currentAddress={props.currentAddress}
                    fullWidth={false}
                    campaign={props.campaign}
                    contribute={props.contribute}
                />
            </Col>
        </Row>
    );
    }
}

const ThirdRow = (props) => {
    var info = [];

    if (props.description != null) {
        info.push(
            <div>
                <h4>About this project</h4>
                <p>{props.description}</p>
            </div>
        );
    }

    if (props.risks != null) {
        info.push(
            <div>
                <h4>Risks</h4>
                <p>{props.risks}</p>
            </div>
        );
    }

    var rewards = [];

    if (props.rewards != null && props.rewards.length > 0) {
        // TODO: for each
        rewards.push(
            <div>
                <h4>Rewards</h4>
                TODO
            </div>
        );
    }

    return (
        <Row>
            <Col xs={12} md={8}>
                {info}
            </Col>
            <Col xs={6} md={4}>
                {rewards}
            </Col>
        </Row>
    );
}