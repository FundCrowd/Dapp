import {CampaignCreated, CampaignStarted, CampaignSuccessful, CampaignFailed} from "../Utilities/Constants"
import {Button} from "react-bootstrap";
import React from "react";

const CampaignButton = (props) => {
    const style = {maxWidth:500, margin: "auto"};
    const coloredStyle = {maxWidth:500, margin: "auto", "background-color":"#007aff", "color":"#ffffff"};
    const now = new Date();

    if (props.campaign) {
        if (props.creator === props.currentAddress) {
            // isCreator
            switch(props.stage) {
                case CampaignCreated:
                    return (<Button style={coloredStyle} onClick={props.campaign.startCampaign} block>Start Campaign</Button>)
                case CampaignStarted:
                    if (now > props.deadline) {
                        return (<Button style={coloredStyle} onClick={props.campaign.settleCampaign} block>Settle Campaign</Button>)
                    } else {
                        return (<Button style={coloredStyle} disabled block>Contribute</Button>)
                    }
                case CampaignSuccessful:
                    return (<Button bsStyle="success" style={style} onClick={props.campaign.withdraw} block>Withdraw</Button>)
                case CampaignFailed:
                    return(<Button bsStyle="danger" style={style} disabled block>Campaign Ended</Button>)
                default:
                    break;
            }
        } else {
            switch(props.stage) {
                case CampaignCreated:
                    return (<Button style={style} disabled block>Not Started</Button>)
                case CampaignStarted:
                    if (now > props.deadline) {
                        return (<Button style={coloredStyle} onClick={props.campaign.settleCampaign} block>Settle Campaign</Button>)
                    } else {
                        return (<Button style={coloredStyle} onClick={props.contribute} block>Contribute</Button>)
                    }
                case CampaignSuccessful:
                    return (<Button bsStyle="success" style={style} disabled block>Campaign Ended</Button>)
                case CampaignFailed:
                    // TODO: check if contributor
                    return(<Button bsStyle="danger" style={style} onClick={props.campaign.refund} block>Refund</Button>)
                default:
                    break;
            }
        }
    }
    return (null)
};
export default CampaignButton;