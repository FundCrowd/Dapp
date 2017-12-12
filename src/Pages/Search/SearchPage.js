import React, {Component} from 'react';
import {PageHeader, Grid, Row, Col} from "react-bootstrap";
import {convertTopicToAddress} from "../../Utilities/util";
import {DiscoverCategories} from "../YourCampaigns/CampaignListener";
import {Loading} from "../../App/Loading";
import CampaignCard from "../Campaign/CampaignCard"
import {Categories, Countries} from "../../Utilities/Constants"

const ITEMS_PER_ROW = 3;

class Search extends Component {
    constructor(props) {
        super(props);
        this.query = props.query;
        this.category = props.category;
        this.state = {
            isQuery: (this.query != null && this.category == null),
            error: false,
            found: null,
            campaigns: []
        };
    };

    componentWillMount() {
    	this.startListener()
    }

    startListener() {
    	if (!this.query && this.category) {
    		if (Categories.includes(this.category)) {
    			// Is a category search
    			this.listenTag("category")
    		} else if (Countries.includes(this.category)) {
    			// Is a search by category
    			this.listenTag("country")
    		} else {
    			let listener = DiscoverCategories[this.category];
    			this.listen(listener);
    		}
        } else {
        	this.listenTag("keyword");
        }
    }

    listen(listener) {
    	if (!listener) {
    		this.setState({found: false})
    	} else {
    		listener(null)
        	.then((results) => {
				this.parseResults(results)
        	})
        	.catch((error) => {
        		console.log(error);
        		this.setState({error: true});
        	})
    	}
    }

    listenTag(key) {
    	let listener = DiscoverCategories["tagged"];
    	listener(null, key, this.category)
    	.then((results) => {
			this.parseResults(results)
    	})
    	.catch((error) => {
    		console.log(error);
    		this.setState({error: true});
    	})
    }

    parseResults(logs) {
    	var campaigns = [];
		for (var i in logs) {
            let campaign = convertTopicToAddress(logs[i].topics[1]);
            campaigns.push(campaign)
        }
        
        this.setState({found: (campaigns.length > 0)})
        this.setState({campaigns: campaigns})
    }

    render() {
    	if (this.state.found == null) {
    		return (<Loading />);
    	}

    	if (this.state.error) {
    		return (
    			<Grid>
    				<br />
    				<h1>Error</h1>
    				<p>Your search request could not be completed.</p>
    			</Grid>
    		);
    	}

    	if (this.state.found) {
			return (
	            <div>
	            	<CampaignResults campaigns={this.state.campaigns} search={(this.query != null && !this.category ? this.query : this.category)}/>
	            </div>
	        )
    	} else {
    		return (
    			<Grid>
    				<PageHeader>Search Not Found</PageHeader>
    				<p>Try reloading the page or searching for something else.</p>
    			</Grid>
    		)
    	}
    }
}

export default Search;

const CampaignResults = (props) => {
	let campaigns = (props.campaigns ? props.campaigns : []);
	var items = [];
	
	for (var i = 0; i < campaigns.length; i += ITEMS_PER_ROW) {
		let row = [];
		for (var x = i; x < i+ITEMS_PER_ROW && x < campaigns.length; x++) {
			row.push(campaigns[x])
		}
		items.push(<CampaignRow campaigns={row}/>);
	}

	return (
		<Grid>
			<PageHeader>Search Results<small> for {props.search}</small></PageHeader>
			{items}
		</Grid>
	);
}

const CampaignRow = (props) => {
	let campaigns = props.campaigns;
	let cols = [];
	for (var i in campaigns) {
		cols.push(<Col xs={6} md={4}><CampaignCard campaignAddress={campaigns[i]}/></Col>);
	}
	return (<Row>{cols}</Row>);
}