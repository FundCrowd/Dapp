import React from 'react';
import {PanelGroup, Panel, Grid, PageHeader} from 'react-bootstrap';

export const FAQPage = (props) => (
    <Grid>
    	<PageHeader>FAQ</PageHeader>
    	<PanelGroup>
    		<FAQItem question="What is FundCrowd?" answer="FundCrowd is an decentralized crowdfunding platform that runs on top of the Ethereum blockchain. You can use it like you would use any other crowdfunding platform, however, instead of fiat currency, crowdfunding campaigns use Ethereum and there are no fees." eventKey="1"/>
    		<FAQItem question="Are there any fees?" answer="FundCrowd has no fees. <br/>Unlike every other crowdfunding service, the 5% fee and the typical 3% for credit card transactions do not apply. The only costs to using FundCrowd are the fees associated with the Ethereum network. This means that creating a campaign costs some amount of Eth and cashing out does as well. Each contributor to your campaigns will pay a small transaction fee to send Ethereum to you as well." eventKey="2"/>
            <FAQItem question="Where can I get Ethereum or convert Ethereum to fiat?" answer="We recommend <a href='https://www.coinbase.com/join/515c8448fda84756310000af'>Coinbase</a>." eventKey="3"/>
            <FAQItem question="How much will it cost me to make a Campaign?" answer="TODO" eventKey="4"/>
            <FAQItem question="What do I need to submit transactions?" answer="Your browser needs to support Smart Contracts. This can be done by installing <a href='https://metamask.io/'>Metamask</a> on your Chrome browser, or by using a browser with support for Smart Contracts like <a href='https://brave.com/'>Brave</a>, <a href='https://github.com/ethereum/mist'>Mist</a>, or <a href='http://www.toshi.org/'>Toshi</a>.<br>Without supporting Smart Contracts, FundCrowd will be limited to simply displaying information and you cannot interact with it." eventKey="5"/>
            <FAQItem question="How is FundCrowd serverless?" answer="We do not host a database or web server to run FundCrowd, the Ethereum blockchain functions as both of those. This means that FundCrowd is very difficult to DDOS, is fully-decentralized, and will operate for as long as the Ethereum blockchain is operational. <br/>We do host these static web pages, however, FundCrowd can be used witout our website by directly interacting with the FundCrowd Smart Contract." eventKey="6"/>
            <FAQItem question="Where do donations to FundCrowd go?" answer="Donations go to supporting the development and adoption of FundCrowd. <br/>Setting a donation percentage on a campaign is completely optional, but a small percentage is encouraged." eventKey="7"/>
    	</PanelGroup>
    </Grid>
);

const FAQItem = (props) => {
	return (
		<Panel collapsible header={props.question} eventKey={props.eventKey} style={{"maxWidth":"75em"}} className="center-block">
            <div dangerouslySetInnerHTML={{__html: props.answer}} />
		</Panel>
	);
}

// TODO: get Coinbase referral link. 