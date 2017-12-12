import React from 'react';
import {addKeyToBatch, executeBatch, getUserAccount, getweb3Batch, isCampaign} from "../../Utilities/Metamask";
import {Grid, Row, Col, PageHeader, FormGroup, ControlLabel, InputGroup, FormControl, HelpBlock, Button, Collapse, Alert} from "react-bootstrap";
// eslint-disable-next-line
import {Categories, Countries, TaggableAttrs, CampaignCreated} from "../../Utilities/Constants";
import {Loading} from "../../App/Loading";
import Campaign from "../Campaign/Campaign";
import CampaignNotFound from "../../App/CampaignNotFound";
import CampaignButton from "../../App/CampaignButton";
import ContributeModal from "../Campaign/ContributeModal";
import "./EditCampaignPage.css"
import {Link} from "react-router-dom"
import { LocalForm, Control, actions } from 'react-redux-form';


class EditCampaignPageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:{},
            currentCategory:Categories[0],
            countries:{},
            currentCountry:Countries[0],
            keyWords:{},
            currentKeyWord:"",
        };
        this.props.campaign.getAttribute("title",((title)=>{
            this.loadAttribute("title",title);
        }));
        this.props.campaign.getAttribute("video",((video)=>{
            this.loadAttribute("video",video);
        }));
        this.props.campaign.getAttribute("image",((image)=>{
            this.loadAttribute("image",image);
        }));
        this.props.campaign.getAttribute("description",((description)=>{
            this.loadAttribute("description",description);
        }));
        this.props.campaign.getAttribute("risks",((risk)=>{
            this.loadAttribute("risk",risk);
        }));
        this.props.campaign.getAttribute("website",((website)=>{
            this.loadAttribute("website",website);
        }));
        this.props.campaign.getTags("category").then((categories) => {
            categories.forEach((category)=> {
                this.setState({categories:{...this.state.categories, [category]: true  }})
            });
        });
        this.props.campaign.getTags("country").then((countries) => {
            countries.forEach((country)=> {
                this.setState({countries:{...this.state.countries, [country]: true  }})
            });
        });
        this.props.campaign.getTags("keyword").then((keywords) => {
            keywords.forEach((keyword)=> {
                this.setState({categories:{...this.state.countries, [keyword]: true  }})
            });
        });
    }

    handleChange(values) {
        console.log(values);
    }

    handleSubmit(values) {
        console.log(values)
    }

    addCategory = () => {
        this.setState({categories:{...this.state.categories, [this.state.currentCategory]: true  }})
    };

    addCountry = () => {
        this.setState({countries:{...this.state.countries, [this.state.currentCountry]: true  }})
    };

    addKeyword = () => {
        this.setState({keyWords:{...this.state.keyWords, [this.state.currentKeyWord]: true  }})
    };

    updateCurrentCategory(event) {
        this.setState({currentCategory: event.target.value})
    };

    updateCurrentCountry(event) {
        this.setState({currentCountry: event.target.value})
    };

    updateCurrentKeyWord(event) {
        this.setState({currentKeyWord: event.target.value})
    };

    removeCategoryTag = (event) => {
        delete this.state.categories[event.target.id]; //Todo: Make this not modify state directly
        this.setState(this.state);
    };

    removeCountryTag = (event) => {
        delete this.state.countries[event.target.id]; //Todo: Make this not modify state directly
        this.setState(this.state);
    };

    removeKeyWordTag = (event) => {
        delete this.state.keyWords[event.target.id]; //Todo: Make this not modify state directly
        this.setState(this.state);
    };

    createAttribute = (key, value) => {
        if (value) {
            this.props.campaign.setAttribute(key, value, (result) => {
                console.log(result)
            })
        }
    }

    createTag = (key, value) => {
        this.props.campaign.setTag(key, value, (result) => {
            console.log(result)
        })
    }

    submitForm = (form) => {
        console.log(form);
        this.props.campaign.getAttribute("title",((title)=>{
            if(form.title!=title){
                this.createAttribute("title",form.title);
            }}));
        this.props.campaign.getAttribute("video",((video)=>{
            if(form.video!=video) {
                this.createAttribute("video", form.video);
            }}));
        this.props.campaign.getAttribute("image",((image)=>{
            if(form.image!=image){
                this.createAttribute("image",form.image);
            }}));
        this.props.campaign.getAttribute("website",((website)=>{
            if(form.website!=website){
                this.createAttribute("website",form.website);
            }}));
        this.props.campaign.getAttribute("description",((description)=>{
            if(form.description!=description){
                this.createAttribute("description",form.description);
            }}));
        this.props.campaign.getAttribute("risks",((risk)=>{
            if(form.risk!=risk){
                this.createAttribute("risks",form.risk);
            }}));
        this.props.campaign.getTags("category").then((categories) => {
            Object.keys(this.state.categories).forEach((category)=> {
                if(!(categories.includes(category)))
                {
                    this.createTag("category",category)
                }
            })});
        this.props.campaign.getTags("country").then((countries) => {
            Object.keys(this.state.countries).forEach((country)=> {
                if(!(countries.includes(country)))
                {
                    this.createTag("country",country)
                }
            })});
        this.props.campaign.getTags("keyword").then((keywords) => {
            Object.keys(this.state.keyWords).forEach((keyword)=> {
                if(!(keywords.includes(keyword)))
                {
                    this.createTag("keyword",keyword)
                }
            })});
    }

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    loadAttribute(key, value) {
        this.formDispatch(actions.change('campaign.'+key, value));
    }

    render() {
        var categoriesSelection = [];
        Categories.forEach((category)=> {
            categoriesSelection.push(<option
                value={category}
                className="EditCampaignPageForm__category-option"
                id={category}
            >
                {category}
            </option>)
        });
        var countriesSelection = [];
        Countries.forEach((country)=> {
            countriesSelection.push(<option
                value={country}
                className="EditCampaignPageForm__country-option"
                id={country}
            >
                {country}
            </option>)
        });
        return (
            <div className="EditCampaignPageForm__root">
                <LocalForm
                    model="campaign"
                    className="EditCampaignPageForm__local-form"
                    getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                    onSubmit={this.submitForm}
                >
                    <div className="EditCampaignPageForm__section">
                        <label>Title:</label>
                        <Control.input
                            className="EditCampaignPageForm__title"
                            model=".title"
                        />
                        <HelpBlock>This is the name of your campaign</HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                    <label>Categories:</label>
                        <Control.select
                            className="EditCampaignPageForm__categories"
                            model=".category"
                            onChange={(value) => this.updateCurrentCategory(value)}
                        >
                            Current Categories:
                            {categoriesSelection}
                        </Control.select>
                        <button
                            type="button"
                            className="EditCampaignPageForm__categories-add-button"
                            onClick={this.addCategory}
                        >
                            Add Category
                        </button>
                    </div>
                    <TagsList
                        tags={Object.keys(this.state.categories)}
                        removeTag={this.removeCategoryTag}
                    />
                    <HelpBlock>Which category does your campaign fall under?</HelpBlock>
                    <div className="EditCampaignPageForm__section">
                        <label>Video:</label>
                        <Control.input
                            className="EditCampaignPageForm__video"
                            model=".video"
                        />
                        <HelpBlock>
                            This is a link to an embeddable video about your campaign like https://www.youtube.com/embed/&#60;VIDEO ID&#62;. Starts with http:// or https://
                        </HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                        <label>Image:</label>
                        <Control.input
                            className="EditCampaignPageForm__image"
                            model=".image"
                        />
                        <HelpBlock>
                            This is a link to an embeddable image of your campaign. Starts with http:// or https://
                        </HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                        <label>Website:</label>
                        <Control.input
                            className="EditCampaignPageForm__website"
                            model=".website"
                        />
                        <HelpBlock>
                            This is a link to your campaign's website. Starts with http:// or https://
                        </HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                        <label>Description:</label>
                        <Control.input
                            className="EditCampaignPageForm__description"
                            model=".description"
                        />
                        <HelpBlock>
                            Describe your campaign. Why are you doing this campaign?
                        </HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                        <label>Risks:</label>
                        <Control.input
                            className="EditCampaignPageForm__risks"
                            model=".risk"
                        />
                        <HelpBlock>
                            Let your contributors know the risks of your campaign. Why might it fail?
                        </HelpBlock>
                    </div>
                    <div className="EditCampaignPageForm__section">
                        <label>Countries:</label>
                        <Control.select
                            className="EditCampaignPageForm__countries"
                            model=".country"
                            onChange={(value) => this.updateCurrentCountry(value)}
                        >
                            Current Countries:
                            {countriesSelection}
                        </Control.select>
                        <button
                            type="button"
                            className="EditCampaignPageForm__categories-add-button"
                            onClick={this.addCountry}
                        >
                            Add Country
                        </button>
                    </div>
                    <TagsList
                        tags={Object.keys(this.state.countries)}
                        removeTag={this.removeCountryTag}
                    />
                    <HelpBlock>
                        Which countries are you operating this campaign in?
                    </HelpBlock>
                    <div className="EditCampaignPageForm__section">
                        <label>Search Keywords:</label>
                        <Control.input
                            componentClass="select"
                            className="EditCampaignPageForm__key-words"
                            model=".keyword"
                            onChange={(value) => this.updateCurrentKeyWord(value)}
                        />
                        <button
                            type="button"
                            className="EditCampaignPageForm__key-word-add-button"
                            onClick={this.addKeyword}
                        >
                            Add Key Word
                        </button>
                    </div>
                    <TagsList
                        tags={Object.keys(this.state.keyWords)}
                        removeTag={this.removeKeyWordTag}
                    />
                    <HelpBlock>
                        Users can use the searchbar above to find your campaign by these keywords.
                    </HelpBlock>
                    <div className="EditCampaignPageForm__section">
                        <button type="submit">
                            Update Campaign Info
                        </button>
                    </div>
                </LocalForm>
            </div>
        );
    }
}


// TODO: abbreviate all keys so they are cheaper
class EditCampaignPage extends React.Component {
    constructor(props) {
        super(props);
        this.address = props.address;
        this.campaign = new Campaign(this.address);
        this.state = {
           "isCampaign": null,
           "isOwner": false,
           showContribute: false
        };

        this.createAttribute = this.createAttribute.bind(this);
        this.toggleContribute = this.toggleContribute.bind(this);
    }

    toggleContribute = () => {
        if (this.state.showContribute)
            this.setState({showContribute:false});
        else
            this.setState({showContribute:true});
    };

    fetchCampaignInfo() {
        this.campaign.getGoal((result) => {
            this.setState({goal:result});
        });
        this.campaign.getDeadline((result) => {
            let dateString = new Date(result*1000);
            this.setState({deadline: dateString.toISOString().slice(0,16)}) // *1000 to convert s to ms
        });
        this.campaign.getCreator((result) => {
            this.setState({creator:result});
            this.setState({isOwner: this.state.currentAddress === result})
        })
        this.campaign.getStage((result) => {
            this.setState({stage: result});
        });
        this.campaign.getTotal((result) => {
            this.setState({totalContributions: result});
        })
        this.campaign.getAttribute("title", (result) => {
            this.setState({title: result});
        });
        this.campaign.getAttribute("video", (result) => {
            this.setState({video: result});
        });
        this.campaign.getAttribute("image", (result) => {
            this.setState({image: result});
        });
        this.campaign.getAttribute("description", (result) => {
            this.setState({description: result})
        });
        console.log("TEST");
        this.campaign.getTags("category")
            .then((result) => {
            this.setState({category: result});
            console.log("output: ",result)
        });
        this.campaign.getAttribute("category", (result) => {
            console.log(result);
            console.log("TEST");
            this.setState({category: result})
        });
        this.campaign.getAttribute("country", (result) => {
            this.setState({country: result})
        });
        this.campaign.getAttribute("risks", (result) => {
            this.setState({risks: result})
        });
        this.campaign.getAttribute("risks", (result) => {
            this.setState({risks: result})
        });
        this.campaign.getAttribute("website", (result) => {
            this.setState({website: result})
        });
    }

    componentWillMount() {
        getUserAccount()
            .then((account) => {
                this.setState({currentAddress:account});
                this.setState({isOwner: account === this.state.creator});
            });

        isCampaign(this.address)
            .catch((error) => {
                console.log(error);
                this.setState({isCampaign: false})
            }).then((value) => {
                if (!value) {
                    this.setState({isCampaign: false})
                } else {
                    this.setState({isCampaign: value[0]});
                    if (value[0]) {
                        this.fetchCampaignInfo()
                    }
                }
            });
    }

    createAttribute = (key, value) => {
        this.campaign.setAttribute(key, value, (result) => {
            console.log(result)
        })
    }

    createTag = (key, value) => {
        this.campaign.setTag(key, value, (result) => {
            console.log(result)
        })
    }

    render() {
        if (this.state.isCampaign === null) {
            return <Loading />
        }
        if (this.state.isCampaign) {
            let isDisabled = (!this.state.isOwner || this.state.stage !== CampaignCreated);
            return (
                <Grid>
                    <Row>
                        <PageHeader>Edit {this.state.title != null ? this.state.title : this.props.address}</PageHeader>

                        {this.state.stage !== undefined && this.state.stage !== CampaignCreated &&
                            <Alert bsStyle="warning">You cannot edit a campaign that has been started.</Alert>
                        }

                        <h3>Required Details</h3>
                        <Col xs={6} md={4}>
                            <AttributeForm
                                type="text"
                                placeholder="Funding Goal"
                                controllabel="Goal:"
                                value={this.state.goal}
                                help="The amount in ETH for the campaign to succeed."
                                action={this.createAttribute}
                                disabled={true}
                            />
                        </Col>
                        <Col xs={6} md={4}>
                            <AttributeForm
                                type="datetime-local"
                                placeholder="Deadline"
                                controllabel="Deadline:"
                                value={this.state.deadline}
                                help="When your fuding goal must be reached by for a successful campaign."
                                action={this.createAttribute}
                                disabled={true}
                            />
                        </Col>
                        <Col xs={6} md={4}>
                            <AttributeForm
                                type="text"
                                placeholder="Creator's Address"
                                controllabel="Creator:"
                                value={this.state.creator}
                                help="This is the creator of the campaign, and should be you."
                                action={this.createAttribute}
                                disabled={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={18} md={12}>
                            <h3>Recommended Details</h3>
                        <EditCampaignPageForm
                            address = {this.props.address}
                            campaign={this.campaign}
                        />
                        </Col>
                    </Row>
                    <br />
                    <CampaignButton 
                        stage={this.state.stage} 
                        deadline={this.state.deadline} 
                        creator={this.state.creator} 
                        currentAddress={this.state.currentAddress}
                        campaign={this.campaign}
                        contribute={this.toggleContribute}/>
                    <br/>
                    <Button className="center-block"><Link to={"/campaign/" + this.props.address}>View Campaign</Link></Button>
                    <ContributeModal 
                        title={this.state.title}
                        campaignAddr={this.address}
                        showModal={this.state.showContribute}
                        toggleContribute={this.toggleContribute}
                        campaignContract={this.campaign}
                    />
                </Grid>
            );
        } else {
            return (<CampaignNotFound />);
        }
    }
}

export default EditCampaignPage;

class AttributeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "valid": null,
            "input": this.props.value,
            "loading": null,
            "edited": false
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveForm = props.action.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(newValue) {
        if (this.props.componentClass === "select") {
            if (newValue === "Choose Option")
                this.setState({"valid": null})
            else 
                this.setState({"valid":"success"})
        } else {
            if (newValue !== "" && newValue && newValue !== this.props.value) {
                this.setState({"valid":"success"})
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.input !== nextProps.value) {
            this.setState({"input":nextProps.value})
        }
    }

    handleChange(event) {
        let hasSelectedDefault = (this.props.componentClass === "select" && event.target.value === "Choose Option")
        if (event.target.value !== this.props.value && this.state.edited !== true)
            this.setState({"edited": true})
        else if (this.state.edited !== false && (event.target.value === this.props.value || event.target.value === "" || hasSelectedDefault))
            this.setState({"edited": false})

        this.setState({"input":event.target.value})
        this.validate(event.target.value)
    }

    render() {
        var notLoading = (!this.state.loading && this.state.valid === "success")
        return (
            <form>
                <FormGroup validationState={this.state.valid}>
                    <ControlLabel>{this.props.controllabel}</ControlLabel>
                    <InputGroup>
                        <CustomFormControl 
                            type={this.props.type}
                            componentClass={this.props.componentClass}
                            placeholder={this.props.placeholder}
                            onChange={this.handleChange}
                            required
                            value={this.state.input}
                            options={this.props.options}
                            disabled={this.props.disabled}
                        />
                    </InputGroup>
                    <HelpBlock>{this.props.help}</HelpBlock>
                </FormGroup>
                <Collapse in={this.state.edited}>
                    <FormGroup>
                        <Button 
                            value="Create"
                            disabled={!notLoading}
                            onClick={() => {this.saveForm(this.props.attrKey, this.state.input)}}>
                            Save
                        </Button>
                    </FormGroup>
                </Collapse>
            </form>
        );
    }
}

// Just decides to use type or componentClass
const CustomFormControl = (props) => {
    if (props.type) {
        // Standard type input
        return (
            <FormControl 
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                required
                disabled={props.disabled}
            />
        );
    } else if (props.componentClass) {
        if (props.componentClass !== "select") {
            // Input component other than select, like textarea
            return (
                <FormControl 
                    componentClass={props.componentClass}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    required
                    disabled={props.disabled}
                />
            );
        } else {
            // Input component dropdown choices
            return (
                <SelectionOptions 
                    onChange={props.onChange}
                    value={props.value}
                    options={props.options}
                    disabled={props.disabled}
                />
            );
        }
    }
}

const TagsList = (props) => {
    if(!props.tags) {
        return null;
    }
    var output = [];
    props.tags.forEach( (category) => {
        output.push((<div
            className="TagsList__Tag"
            id={category}
            onClick={props.removeTag}
        >
            {category}
        </div>))
    });
    return output
}

const SelectionOptions = (props) => {
    var selections = [];
    var found = false;
    for (var item in props.options) {
        if (!found && props.value === props.options[item]) {
            selections.push(<option selected value={props.options[item]}>{props.options[item]}</option>)
            found = true;
        } else {
            selections.push(<option value={props.options[item]}>{props.options[item]}</option>)
        }
    }

    if (!found)
        selections.unshift(<option value="Choose Option">Choose Option</option>)

    return (
        <FormControl componentClass="select" onChange={props.onChange} disabled = {props.disabled} required>
            {selections}
        </FormControl>
    );
}

// TODO - nonmvp: make advanced expand with key value setting
// TODO - nonmvp: make warning when leaving page