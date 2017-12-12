import {Component} from 'react';
import {getEventListener, getUpdateFromListener, uninstallListener} from "./Metamask";

class EventHandler extends Component {
    constructor(props) {
        super(props);
        this.abi = this.props.abi;
        this.state = {
            ListenerId: null,
            lambdaOutput: null,
        };
    }

    componentWillMount() {
        this.setState({lambdaOutput:null});
        const listenerPromise =  getEventListener(this.props.event,this.props.topics);
        listenerPromise.then((id) => {
            this.setState({ListenerId: id});
        });
    }

    componentWillUnmount()
    {
        uninstallListener(this.state.ListenerId)
            .then((result) => {
            if(result !== true) {
                console.log(result)
            }
            });
    }

    render() {
        const listenerUpdatePromise = getUpdateFromListener(this.state.ListenerId);
        listenerUpdatePromise.then( (result) => {
             if (result.length !== 0) {
                this.setState({lambdaOutput: this.props.lambda(result)});
            }
        });
        if (this.state.lambdaOutput === undefined) {
            return null;
        }
        return this.state.lambdaOutput;
    }
}

export default EventHandler;