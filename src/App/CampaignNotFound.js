import React from "react";
import {Grid, PageHeader} from "react-bootstrap";

const CampaignNotFound = (props) => {
    return  (
        <Grid>   
            <PageHeader>Campaign Not Found</PageHeader>
            <h4>Try checking the address within the URL and reloading the page</h4>
        </Grid>
    );
};

export default CampaignNotFound;