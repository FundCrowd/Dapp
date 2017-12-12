import Eth from 'ethjs'
import {CampaignAbi, CampaignFactoryContract, CampaignFactoryContractWeb3} from "./Constants"
import {fromAscii, sha3, toAscii, toWei} from "./util";

var eth;
var web3;

export const setEth = (myEth) => {
    eth=myEth;
}

export const setWeb3 = (myWeb3) => {
  web3=myWeb3;
};

export const getweb3Batch = () => {
  var batch = new web3.BatchRequest();
  return batch
    // batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', ((err,res) => {console.log("HERE ",res)})));
    // batch.execute();
};

export const addKeyToBatch = (batch, address, key, value) => {
    getUserAccount()
        .then((account) => {
        // batch.add(CampaignFactoryContractWeb3.methods.setAttribute(address, fromAscii(key), value).call.request({from:address},()=>{debugger}))
        batch.add(web3.eth.getBalance.request('0x0000000000000000000000000000000000000000', 'latest', function(error, result){
            if(!error)
                console.log(result)
            else
                console.error(error);
        }));
    })
    // batch.add()
}

export const executeBatch = (batch) => {
    batch.execute();
}



export const getBlockNumber = (setState) => {
    eth.blockNumber()
        .then((result) => {
            setState(result.words[0])
        }).catch((error) => {
        console.log(error)
    });
};

export const getUserAccount = ()  => {
    return eth.accounts().then( (accounts) => {
        return accounts[0];
    } )
}

export const getEventListener = (eventSignature, topics, address) => {

    const event = sha3(eventSignature);
    const topicsArray= [event].concat(topics||null);
    return eth.newFilter({
            fromBlock: '1',
            toBlock: 'latest',
            address: address,
            topics: topicsArray,
        })
};

export const getBlockListener = () => {
    return eth.newBlockFilter()
};

export const uninstallListener = (listenerId) => {
    return eth.uninstallFilter(listenerId)
        .then( (Successful) => {return Successful} )
        .catch( (error) => {return error} )
}

export const getUpdateFromListener = (listenerId) => {
    if(!listenerId) {
        return new Promise((resolve,reject) => {
            resolve([]);
            reject([]);
        })
    }
    return eth.getFilterChanges(listenerId)
}


export const getLogsForFilter = (eventSignature, topics, address) => {
    const event = sha3(eventSignature)
    const topicsArray = [event].concat(topics||null);
    return eth.getLogs({
                fromBlock: '1',
                toBlock: 'latest',
                address: address,
                topics: topicsArray,
        })
        .catch((test) => {
            console.log(test);
        });
};

export const getContract = (contractAddress,abi) => {
    return eth.contract(abi).at(contractAddress);
}

export const getWeb3Contract = (contractAddress, abi) => {
    var contract = new web3.eth.Contract(abi,contractAddress);
    return contract
}

export const getCampaignContract = (contractAddress) => {
    return eth.contract(CampaignAbi).at(contractAddress)
}

export const getTransactionReceipt = (transHash) => {
    return eth.getTransactionReceipt(transHash);
}

export const getTransaction = (transHash) => {
    return eth.getTransactionByHash(transHash);
}

export const isAddress = (address) => {
    return Eth.isAddress(address);
}

export const isCampaign = (address) => {
    return CampaignFactoryContract.checkForCampaign(address);
}

export const transfer = (from, to) => {
    return eth.sendTransaction({
      from: from,
      to: to,
      value: toWei('0.01'),
      gas: '21000',
      data: '0x',
    })
}