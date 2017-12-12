import React from 'react';

class CampaignForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleAddressChange(event) {
        // TODO: should disable submit button
        // this.eth.isAddress(event.target.value).then((isAddress) => {
        //     if (isAddress) {
        //         this.setState({owner: event.target.value});
        //     } else {
        //         // TODO: should show text field error state
        //     }
        //     // Enable
        // })
        this.setState({address: event.target.value});
    }

    submit = () => {
        this.props.callbackFromParent(this.state.address);
    }

    render() {
        return (
            <div>
                <h3>Load Campaign:</h3>
                <label>
                    Address:
                    <input type="text" value={this.state.addres} onChange={this.handleAddressChange}/>
                </label>
                <button value="Submit" onClick={this.submit}> Load </button>
            </div>
        );
    }
}

export default CampaignForm;