import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {About} from "../Pages/About/AboutPage";
import SearchPage from "../Pages/Search/SearchPage";
import HomePage from "../Pages/Home/HomePage";
import {Footer} from "./Footer";
import CampaignPage from "../Pages/Campaign/CampaignPage";
import StartPage from "../Pages/Start/StartPage"
import {NavBar} from "./NavBar";
import YourCampaignsPage from "../Pages/YourCampaigns/YourCampaignsPage";
import {FAQPage} from "../Pages/FAQ/FAQPage";
import {TeamPage} from "../Pages/Team/TeamPage";
import {TermsOfServicePage} from "../Pages/TOS/TermsOfServicePage";
import {PrivacyPolicyPage} from "../Pages/Privacy/PrivacyPolicyPage";
import EditCampaignPage from "../Pages/EditCampaign/EditCampaignPage";
import {Grid, Button} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBlock:0,
            balance:0
        };
    }

    pageNotFound = (() => {
        return <PageNotFound />
    })

    homeWrapper =  (() => {
        return <HomePage/>
    });

    aboutWrapper =  (() => {
        return <About/>
    });

    searchWrapper =  ((match) => {
        return <SearchPage query={match.match.params.query}/>
    });

    campaignWrapper =  ((match) => {
        return <CampaignPage campaignAddr={match.match.params.campaignAddr}/>
    });

    startWrapper = (() => {
        return <StartPage/>
    });

    yourCampaignsWrapper = (() => {
        return <YourCampaignsPage/>
    });

    fAQWrapper = (() => {
        return <FAQPage />
    });

    teamWrapper = (() => {
        return <TeamPage />
    });

    tOSWrapper = (() => {
        return <TermsOfServicePage />
    });

    privacyWrapper = (() => {
        return <PrivacyPolicyPage />
    });

    editCampaignWrapper = ((match) => {
        return <EditCampaignPage address={match.match.params.address}/>
    });

    discoverWrapper =  ((match) => {
        return <SearchPage category={match.match.params.category}/>
    });

    yourCampaignsTxWrapper = ((match) => {
        return <YourCampaignsPage txHash={match.match.params.txHash}/>
    });

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <NavBar />
                        <Switch>
                            <Route exact path="/" component={this.homeWrapper}/>
                            <Route path="/about" component={this.aboutWrapper}/>
                            <Route path="/search/:query" component={this.searchWrapper}/>
                            <Route path="/campaign/:campaignAddr" component={this.campaignWrapper}/>
                            <Route path="/start" component={this.startWrapper} />
                            <Route path="/campaigns/:txHash" component={this.yourCampaignsTxWrapper}/>
                            <Route path="/campaigns" component={this.yourCampaignsWrapper}/>
                            <Route path="/faq" component={this.fAQWrapper} />
                            <Route path="/team" component={this.teamWrapper} />
                            <Route path="/terms-of-service" component={this.tOSWrapper} />
                            <Route path="/privacy" component={this.privacyWrapper} />
                            <Route path="/edit/:address" component={this.editCampaignWrapper} />
                            <Route path="/discover/:category" component={this.discoverWrapper} /> 
                            <Route component={this.pageNotFound} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

const PageNotFound = (props) => (
    <Grid>
        <br />
        <h1>Page Not Found</h1>
        <Link to="/"><Button>Home</Button></Link>
    </Grid>
)
