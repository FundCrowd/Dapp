import React from 'react';
import {getUserAccount, getTransactionReceipt} from "../../Utilities/Metamask";
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, ProgressBar} from "react-bootstrap"
import {validateAmount, validateDateTime, toWei} from "../../Utilities/util";
import {CampaignFactoryContract} from "../../Utilities/Constants";
import {Redirect} from "react-router-dom"

class CreateCampaignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: '',
            goalValid: null,
            deadline: '',
            deadlineValid:null, 
            loading:false,
            donationAmount: 1,
            donationAmountValid: "success",
            campaignTx: null
        };

        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
        this.handleDonationAmountChange = this.handleDonationAmountChange.bind(this);
        this.createCampaign = this.createCampaign.bind(this);
    }

    createCampaign() {
        this.setState({loading:true})
        const deadlineEpoch = (new Date(this.state.deadline)).getTime()/1000;
        console.log(deadlineEpoch)
        getUserAccount()
            .then((account) => {
                CampaignFactoryContract.createCampaign(toWei(this.state.goal), deadlineEpoch, this.state.donationAmount, {from:account, data:null})
                    .then((campaign) => {
                        getTransactionReceipt(campaign)
                        .then((result) => {
                            this.setState({loading:false})
                            console.log(result)
                        })
                        this.setState({campaignTx: campaign})
                        console.log(campaign)
                    })
                    .catch((error) => {
                        this.setState({loading:false})
                        console.log(error)
                    });
            })
    }

    handleGoalChange(event) {
        this.setState({goal: event.target.value});
        this.setState({goalValid: validateAmount(event.target.value)});
    }

    handleDeadlineChange(event) {
        this.setState({deadline: event.target.value});
        this.setState({deadlineValid: validateDateTime(new Date(event.target.value))});
    }

    handleDonationAmountChange(event) {
        if (event.target.value === "") {
            this.setState({donationAmountValid: null});
            this.setState({donationAmount: ""});
        } else {
            var amount = parseFloat(event.target.value);
            if (amount != null && amount >= 0 && amount <= 100) {
                this.setState({donationAmountValid: "success"});
                this.setState({donationAmount: event.target.value});
            } else {
                this.setState({donationAmountValid: "error"});
                this.setState({donationAmount: ""});
            }
        }
    }

    render() {
        if (this.state.campaignTx !== null && this.state.campaignTx !== undefined) {
            return (
                <Redirect to={"/campaigns/" + this.state.campaignTx}/>
            );
        }


        let notLoading = (!this.state.loading && this.state.goalValid === "success" && this.state.deadlineValid === "success" && this.state.donationAmountValid === "success");
        return (
            <form>
                <FormGroup validationState={this.state.goalValid}>
                    <ControlLabel>What is your campaign's funding goal?</ControlLabel>
                    <InputGroup>
                        <FormControl 
                            type="number"
                            placeholder="Enter Goal Amount"
                            value={this.state.goal}
                            onChange={this.handleGoalChange}
                            required
                        />
                        <InputGroup.Addon>ETH</InputGroup.Addon>
                    </InputGroup>
                    <HelpBlock>Amount must be a positive amount in ETH with up to 18 decimal places.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={this.state.deadlineValid}>
                    <ControlLabel>When is your deadline?</ControlLabel>
                    <InputGroup>
                        <FormControl 
                            type="datetime-local"
                            placeholder="Deadline Date and Time"
                            value={this.state.deadline}
                            onChange={this.handleDeadlineChange}
                            required
                        />
                    </InputGroup>
                    <HelpBlock>Deadline is a local date and time after right now.</HelpBlock>
                </FormGroup>
                <FormGroup validationState={this.state.donationAmountValid} >
                    <ControlLabel>Consider donating a percentage if your campaign succeeds:</ControlLabel>
                    <InputGroup style={{"maxWidth":"10em"}}>
                        <FormControl 
                            type="number"
                            placeholder="Donation"
                            value={this.state.donationAmount}
                            onChange={this.handleDonationAmountChange}
                            required
                        />
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                    <HelpBlock>This is a percentage between 0 - 100%. It will be donated to the FundCrowd team if your campaign succeeds.</HelpBlock>
                </FormGroup>
                <ProgressBar active now={this.state.donationAmount} label={`${parseFloat(this.state.donationAmount)}%`}/>
                <FormGroup>
                    <Button 
                        value="Create"
                        disabled={!notLoading}
                        onClick={notLoading ? this.createCampaign : null}>
                        Save and Continue
                    </Button>
                </FormGroup>
            </form>
        );
    }
}

export default CreateCampaignForm;