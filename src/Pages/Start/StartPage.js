import React, {Component} from 'react';
import CreateCampaignForm from "./CreateCampaignForm"
import {PageHeader} from "react-bootstrap"

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignSaved: false
        };
    };

    render() {
        if (this.state.campaignSaved) {
            // TODO: make loading spinner and tell user its been submitted
        } else {
            return (
                <div className="start-container">
                    <br />
                    <PageHeader>Get Started</PageHeader>
                    <CreateCampaignForm />
                </div>
            )
        }
    }
}

export default StartPage;