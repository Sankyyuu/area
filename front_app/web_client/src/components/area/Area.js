import React from 'react';
import Navbar from '../layout/Navbar'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import LogoGmail from "../../styles/icons/logo_gmail.png";
import LogoGithub from "../../styles/icons/logo_github.png";
import LogoTwitter from "../../styles/icons/logo_twitter.png";
import LogoTimer from "../../styles/icons/logo_timer.png";
import LogoWeather from "../../styles/icons/logo_weather.png";
import LogoLinkedin from "../../styles/icons/logo_linkedin.png";
import LogoYoutube from "../../styles/icons/logo_youtube.png";

import '../../styles/css/area.css'
import '../../styles/css/serviceslits.css'
import axios from "axios";

const INITIAL_STATE = {
    valueAction: '',
    valueReaction: '',
    user: {}
};

const LOGOS = {
    github_star: LogoGithub,
    github_push: LogoGithub,
    github_pull_request: LogoGithub,
    github_issue: LogoGithub,
    rappel:LogoTimer,
    rappel_everyday:LogoTimer,
    weather_temp: LogoWeather,
    weather_rain: LogoWeather,
    weather_wind: LogoWeather,
    send_email: LogoGmail,
    post_tweet: LogoTwitter,
    unfollow: LogoTwitter,
    linkedin_post: LogoLinkedin,
    youtube_comment: LogoYoutube,
    youtube_likee: LogoYoutube
}

class Area extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE ,
            userAreas: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const id = localStorage.getItem("user");
        this.getUserActions(id);
        this.getUserReactions(id);
        this.getAreas(id);
    }

    getUserActions = (id) => {
        axios.get('https://areaserver.herokuapp.com/area/actions/available?userId=' + id).then((res) => {
            console.log("res ACTIONS:", res);
            this.setState({userActions: res.data});
        }).catch((error) => {
            console.log("error:", error);
        })
    }
    getUserReactions = (id) => {
        axios.get('https://areaserver.herokuapp.com/area/reactions/available?userId=' + id).then((res) => {
            console.log("res: REACTIONS:", res);
            this.setState({userReactions: res.data});
        }).catch((error) => {
            console.log("error:", error);
        })
    }
    getAreas = (id) => {
        axios.get('https://areaserver.herokuapp.com/area?userId=' + id).then((res) => {
            console.log("USER AREAS:", res);
            this.setState({userAreas: res.data});
        }).catch((error) => {
            console.log("error:", error);
        })
    }

    deleteArea = (idArea) => {
        axios.delete('https://areaserver.herokuapp.com/area/' + idArea).then((res) => {
            // console.log("res:", res);
            this.getAreas(localStorage.getItem("user"));
            alert("area successfully deleted");
        }).catch((error) => {
            alert("area deletion failed");
            console.log("error:", error);
        })
    }

    handleDelete = () => {
        const url = `https://areaserver.herokuapp.com/area?userId=` + localStorage.getItem("user");
        axios.delete(url);
    };

    handleAction = (e) => {
        this.setState({action: e.target.value});
    };

    handleReaction = (e) => {
        this.setState({reaction: e.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

    };

    render () {
        // console.log("userAreas", this.state.userAreas);
        // console.log("action:", this.state.action)
        // console.log("reaction:", this.state.reaction)
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <Typography variant="h5" component="h3">
                        Create your Meals
                    </Typography>
                    <ExpansionPanel className="panel">
                        <ExpansionPanelSummary expandIcon={<AddIcon />}>
                            <Typography>Available Actions & Reactions </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <form className="left" onSubmit={this.handleSubmit}>
                                <FormControl component="fieldset">
                                <FormLabel component="legend">Actions</FormLabel>
                                        {this.state.userActions ? (
                                            <RadioGroup
                                                aria-label="Action"
                                                name="action"
                                                value={this.state.action}
                                                onChange={(e) => this.handleAction(e)}
                                            >
                                            {this.state.userActions.map((actions) => (

                                                actions.actions.length ? (
                                                        actions.actions.map((item) => (
                                                            <FormControlLabel value={item} control={<Radio />} label={item} />
                                                        ))
                                                ) : (
                                                    null
                                                )
                                            ))}
                                            </RadioGroup>
                                        ) : (
                                            <p>loading</p>
                                        )}
                                </FormControl>

                                <FormControl component="fieldset">
                                <FormLabel component="legend">Reactions</FormLabel>
                                        {this.state.userReactions ? (
                                            <RadioGroup
                                                aria-label="Reaction"
                                                name="reaction"
                                                value={this.state.reaction}
                                                onChange={(e) => this.handleReaction(e)}
                                            >
                                            {this.state.userReactions.map((reactions) => (

                                                reactions.reactions.length ? (
                                                        reactions.reactions.map((item) => (
                                                            <FormControlLabel value={item} control={<Radio color="primary"/>} label={item}/>
                                                        ))
                                                ) : (
                                                    null
                                                )
                                            ))}
                                            </RadioGroup>
                                        ) : (
                                            <p>loading</p>
                                        )}
                                </FormControl>
                                <div>
                                <Button href={"/areaform?action=" + this.state.action + "&reaction=" + this.state.reaction} color="primary">
                                    Create Area
                                </Button>
                                </div>
                            </form>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <div className="container">
                    <Typography variant="h5" component="h3">
                        Your Meals
                    </Typography>
                        {this.state.userAreas.length && this.state.userAreas ? (
                            <div style={{display: "inline-block"}}>
                            {this.state.userAreas.map((area) => (
                                    <Card className="card" style={{margin:"20px", display:"inline-block"}} key={area.id}>
                                        <CardContent>
                                            <h5>{area.name}</h5>
                                            <img alt={area.action.name} src={LOGOS[area.action.name]} width="25" height="25"/>
                                            <PlayArrowIcon />
                                            <img alt={area.reaction.name} src={LOGOS[area.reaction.name]} width="25" height="25"/>
                                            <Typography>
                                                {area.action.name} -> {area.reaction.name}
                                            </Typography>
                                        </CardContent>
                                            <CardActions>
                                            <Button onClick={() => this.deleteArea(area.id)}>
                                                Delete
                                            </Button>
                                            <Button color="primary">
                                                Details
                                            </Button>
                                        </CardActions>
                                    </Card>
                            ))}
                            </div>
                        ) : (
                            <p>loading</p>
                        )}
                </div>
            </div>
        )
    }
}

export default Area