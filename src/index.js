import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import Eth from 'ethjs'
import Web3 from 'web3'
import {getweb3Batch, setEth, setWeb3} from "./Utilities/Metamask";
import {initializeContracts} from "./Utilities/Constants";
let eth;
let web3;
function renderReact() {
    ReactDOM.render(<App/>, document.getElementById('root'));
    registerServiceWorker();
}

window.addEventListener('load', function() {

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
        console.log("Using MetaMask")
        // Use Mist/MetaMask's provider
        eth = new Eth(window.web3.currentProvider);
        web3 = new Web3(window.web3.currentProvider);
        setEth(eth);
        setWeb3(web3);
        getweb3Batch()
    } else {
        console.log("Using remote Web3")
        // eth = new Eth(new Eth.HttpProvider("http://localhost:8545"));'

        // Dev
        eth = new Eth(new Eth.HttpProvider("https://ropsten.infura.io/mEMUPrrbLDQtcqo4Mg4K"));

        // Prod
        // eth = new Eth(new Eth.HttpProvider("https://mainnet.infura.io/mEMUPrrbLDQtcqo4Mg4K"));

        setEth(eth)
    }
    initializeContracts()
    renderReact();
});