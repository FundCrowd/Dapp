import Eth from 'ethjs'
import {getLogsForFilter} from "./Metamask";
import {CampaignFactoryAddress} from "./Constants";
import { keccak256 } from 'js-sha3';

// Validations
export const validateAmount = (amount) => {
    if (amount === '' || amount == null)
        return null;
    else {
        let num = parseFloat(amount, 10)
        if (num <= 0 || isNaN(num)) // TODO: verfy that the amount is less than the user's balance
            return 'error';
        else 
            return 'success';
    }
}

export const validateDateTime = (dateTime) => {
    if (dateTime == null)
        return null
    return (new Date() < dateTime ? 'success' : 'error')
}

export const validateUrl = (url) => {
    if (url === "" || url === null)
        return null
    // Taken from
    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    // eslint-disable-next-line
    let isUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test( url );
    return (isUrl ? "success" : "error")
}

// Data/Topic Conversions
export const convertAddressToTopic = (address) => {
    if (!address)
    {
        return "0x000000000000000000000000"
    }
    return "0x000000000000000000000000"+address.substring(2)
}

export const convertTopicToAddress = (topic) => {
    return "0x"+topic.substring(26)
}

export const convertToTopic = (object) => {
    return "0x" + convertToData(object);
}

export const convertToData = (object) => {
    let hex = fromAscii(object).substr(2);
    return hex + '0'.repeat(64-hex.length);
}

export const GetAddressFromLogs = (logs,topicIndex) => {
    var addresses = [];
    for(let i = 0; i<logs.length; i++ ){
        addresses.push(convertTopicToAddress(logs[i].topics[topicIndex]))
    }
    return addresses
}

// Event Methods
export const GetEvents = (address, event) => {
    if (!address) {
        return new Promise((resolve,reject) => {
            resolve(null);
            reject(null);
        })
    }
    return getLogsForFilter(event,[null],CampaignFactoryAddress);
};


export const GetMostRecentEvents = (address, event, amount) => {
    GetEvents(address,event)
        .then((logs) => {
            return logs.slice(-amount).reverse()
        })
};

// Ascii/Hex Conversions
export const toAscii = (string) => {
    return Eth.toAscii(string);
}

export const fromAscii = (string) => {
    return Eth.fromAscii(string);
}

// Ethereum Conversions
export const toWei = (value) => {
    return Eth.toWei(value, "ether");
}

export const fromWei = (value) => {
    return Eth.fromWei(value, "ether");
}

// Sha3
export const sha3 = (message) => {
    return "0x"+keccak256(message);
}