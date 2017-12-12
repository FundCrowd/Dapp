import React, {Component} from "react";
import {Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from "react-bootstrap"
import {validateAmount, toWei} from "../../Utilities/util";

class ContributeModal extends Component {
    constructor(props) {
        super(props);
        this.correctTitle = (props.title != null) ? props.title : props.campaignAddr;
        this.state = {
            amount: '',
            amountValid: null,
            loading: false
        }

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.contribute = this.contribute.bind(this);
    }

    handleAmountChange(event) {
        this.setState({amount: event.target.value});
        this.setState({amountValid: validateAmount(event.target.value)});
    }

    clearState() {
        this.setState({"amount":""})
        this.setState({"amountValid":null})
        this.setState({"loading":false})
    }

    contribute() {
        this.setState({loading: true})
        this.props.campaign.contribute(this.state.amount, (result) => {
            this.props.toggleContribute()
            this.clearState()
        })
    }

    render() {
        let notLoading = (!this.state.loading && this.state.amountValid === "success");
        return (
            <Modal show={this.props.showModal} onHide={this.props.toggleContribute}>
                <Modal.Header closeButton>
                    <Modal.Title>Contibute to {this.correctTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup validationState={this.state.amountValid}>
                            <ControlLabel>How much would you like to contribute?</ControlLabel>
                            <InputGroup>
                                <FormControl 
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={this.state.amount}
                                    onChange={this.handleAmountChange}
                                />
                                <InputGroup.Addon>ETH</InputGroup.Addon>
                            </InputGroup>
                            <HelpBlock>Amount must be a positive amount in ETH with up to 18 decimal places.</HelpBlock>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        bsStyle="success" 
                        value="Submit"
                        disabled={!notLoading}
                        onClick={notLoading ? this.contribute : null}>
                        Contribute
                    </Button>
                    <Button onClick={this.props.toggleContribute}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ContributeModal;