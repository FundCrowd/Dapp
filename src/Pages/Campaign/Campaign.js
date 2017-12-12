import {getCampaignContract, getUserAccount} from "../../Utilities/Metamask";
import {fromAscii, toWei, fromWei, toAscii} from "../../Utilities/util";
import {CampaignFactoryContract} from "../../Utilities/Constants";

// Campaign: models the on-chain campaign and allows other classes to perform actions on it

class Campaign {
	constructor(address) {
        this.address = address;
		this.contract = getCampaignContract(address);

        // Mandatory - passed
        this.campaignFactory = null;
        this.creator = null;
        this.goal = null;
        this.deadline = null;
        this.donation = null;

        // Stored
        this.stage = null;
        this.total = null;
        this.contributions = {};
        this.tags = {};
        this.attributes = {};
        this.donatee = null;
	}

    // Campaign Getters

    getStage = (callback) => {
        this.contract.stage()
            .catch((error) => {
                console.log(error)
            })
            .then((stage) => {
                this.stage = stage[0].toNumber();
                if (callback)
                    callback(this.stage)
            })
    }

	getAttribute = (key, callback) => {
    	this.contract.getAttribute(fromAscii(key))
    		.catch((error) => {
                console.log(error)
            }).then((value) => {
                if (value && value[0] !== "") {
                    this.attributes[key] = value[0];
                    if (callback)
                        callback(value[0])
                }
                else {
                    callback(null)
                }
            })
    }

    getTags = (key) => {
	    return this.contract.getTag(fromAscii(key))
            .then( (result) => {
                console.log("RESULT, ", result);
                var output=[];
                result[0].forEach((value) => {
                    output.push(toAscii(value));
                });
                return output
            });
    }

    getGoal = (callback) => {
        this.contract.goal()
            .catch((error) => {
                console.log(error)
            }).then((goal) => {
                this.goal = fromWei(goal[0]);
                if (callback)
                    callback(this.goal)
            })
    }

    getDeadline = (callback) => {
        this.contract.deadline()
            .catch((error) => {
                console.log(error)
            }).then((deadline) => {
                this.deadline = deadline[0].toNumber();
                if (callback)
                    callback(this.deadline)
            })
    }

    getCreator = (callback) => {
        this.contract.creator()
            .catch((error) => {
                console.log(error)
            }).then((creator) => {
                this.creator = creator[0].toString();
                if (callback)
                    callback(this.creator)
            })
    }

    getTotal = (callback) => {
        this.contract.total()
            .catch((error) => {
                console.log(error)
            }).then((total) => {
                this.total = fromWei(total[0]);
                if (callback)
                    callback(this.total)
            })
    }

    // Campaign Setters

    setAttribute = (key, value, callback) => {
        getUserAccount()
        .then((account) => {
            CampaignFactoryContract.setAttribute(this.address, fromAscii(key), value, {from:account, data:null})
            .then((result) => {
                if (callback)
                    callback(true)
            })
            .catch((error) => {
                console.log(error);
                if (callback)
                    callback(false)
            })
        })
    };

    setTag = (key, value, callback) => {
        getUserAccount()
        .then((account) => {
            CampaignFactoryContract.setTag(this.address, fromAscii(key), fromAscii(value), {from:account, data:null})
            .then((result) => {
                if (callback)
                    callback(true)
            })
            .catch((error) => {
                console.log(error);
                if (callback)
                    callback(false)
            })
        })
    };

    // Campaign Actions

    startCampaign = () => {
        getUserAccount()
        .then((account) => {
            CampaignFactoryContract.startCampaign(this.address, {from:account, data:null})
            .catch((error) => {
                console.log(error);
                return false;
            }).then((result) => {
                return true;
            })        
        })
    };

    contribute = (value, callback) => { 
       getUserAccount()
        .then((account) => {
            CampaignFactoryContract.contribute(this.address, {from: account, data: null, value: toWei(value)})
            .catch((error) => {
                console.log(error);
                if (callback)
                    callback(false)
            }).then((result) => {
                if (callback && result)
                    callback(result[0].toNumber()) // TODO: verify this works
            })
        }) 
    }

    refund = (callback) => {
        getUserAccount()
        .then((account) => {
            CampaignFactoryContract.refund(this.address, {from:account, data:null})
            .catch((error) => {
                console.log(error);
                if (callback)
                    callback(false)
            }).then((result) => {
                if (callback)
                    callback(result[0].toNumber()) // TODO: verify this works
            })
        })
    };

    settleCampaign = (callback) => {
        getUserAccount()
        .then((account) => {
            CampaignFactoryContract.settleCampaign(this.address, {from:account, data:null})
            .catch((error) => {
                console.log(error);
                if (callback)
                    callback(false)
            }).then((result) => {
                if (callback)
                    callback(true)
            })
        })
    };

    withdraw = (callback) => {
        getUserAccount()
        .then((account) => {
            if (this.creator != null || account === this.creator) {
                CampaignFactoryContract.withdraw({from:account, data:null})
                .catch((error) => {
                    console.log(error);
                    if (callback)
                        callback(false)
                }).then((result) => {
                    if (callback && result)
                        callback(result[0].toNumber()) //TODO: verify this works
                })        
            } else {
                if (callback)
                    callback(false)
            }
        })
    }
}

export default Campaign;