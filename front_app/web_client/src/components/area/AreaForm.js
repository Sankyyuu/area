import React from 'react';
import Navbar from '../layout/Navbar'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography, TextField } from '@material-ui/core';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import '../../styles/css/area.css';

//actions
import GithubStar from './actions/GithubStar';
import GithubPush from './actions/GithubPush';
import GithubPull from './actions/GithubPull';
import GithubIssue from './actions/GithubIssue';
import Rappel from './actions/Rappel';
import RappelEveryday from './actions/RappelEveryday';
import WeatherTemperature from './actions/WeatherTemperature';
import WeatherRain from './actions/WeatherRaining';
import WeatherWind from './actions/WeatherWind';

//reaction
import GmailSend from './reactions/GmailSend';
import TwitterPost from './reactions/TwitterPost';
import TwitterFollow from './reactions/TwitterFollow';
import LinkedinPost from './reactions/LinkedinPost';
import YoutubePost from './reactions/YoutubePost';
import YoutubeLike from './reactions/YoutubeLike';

const INITIAL_STATE = {
	owner: '',
	userID: '',
	repository: '',
	to: '',
	subject: '',
	message: '',
};


class AreaForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			...INITIAL_STATE,
			userAreas: {},
			reactionData: {},
			actionData: {},
			name: "Area",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	actionData = {};
	reactionData = {};

	componentDidMount() {
		let params = queryString.parse(this.props.location.search)
		this.setState({action: params.action, reaction: params.reaction})
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (!Object.keys(this.actionData).length || !Object.keys(this.reactionData).length) {
			alert("Please fill the forms")
			return;
		}
		// axios.post(`https://areaserver.herokuapp.com/area/create/`, {userId: localStorage.getItem("user"), action: {name: "github star", owner: this.state.owner, repo: this.state.repository}, reaction: {name: "send email", to: this.state.to, subject: this.state.subject, message: this.state.message}}, {headers: {'Content-Type':'application/json'}})
		axios.post(`https://areaserver.herokuapp.com/area/create/`, {userId: localStorage.getItem("user"), name: this.state.name, action: this.actionData, reaction: this.reactionData}, {headers: {'Content-Type':'application/json'}})
			.then(res => {
				if (res.status === 200) {
					alert("area successfully created");
					this.props.history.push("/home")
				}
				console.log(res);
			}).catch((error) => {
				alert("creation of the area failed");
			})
	};

	updateAction = (action) => {
		// this.setState({actionData: action})
		this.actionData = action;
		console.log('action:', this.actionData)
	}

	handleName = (e) => {
		this.setState({name: e.target.value})
	}

	updateReaction = (reaction) => {
		// this.setState({reactionData: reaction})
		this.reactionData = reaction;
		console.log('reaction:', this.reactionData)
	}

	render ()
	{
		const actions = {
			"github_star": <GithubStar updateData={this.updateAction}/>,
			"github_push": <GithubPush updateData={this.updateAction}/>,
			"github_pull_request": <GithubPull updateData={this.updateAction}/>,
			"github_issue": <GithubIssue updateData={this.updateAction}/>,
			"rappel": <Rappel updateData={this.updateAction}/>,
			"rappel_everyday": <RappelEveryday updateData={this.updateAction}/>,
			"weather_temp": <WeatherTemperature updateData={this.updateAction}/>,
			"weather_rain": <WeatherRain updateData={this.updateAction}/>,
			"weather_wind": <WeatherWind updateData={this.updateAction}/>,
		}

		const reactions = {
			"send_email": <GmailSend updateData={this.updateReaction}/>,
			"post_tweet": <TwitterPost updateData={this.updateReaction}/>,
			"unfollow": <TwitterFollow updateData={this.updateReaction}/>,
			"linkedin_post": <LinkedinPost updateData={this.updateReaction}/>,
			"youtube_comment": <YoutubePost updateData={this.updateReaction}/>,
			"youtube_like": <YoutubeLike updateData={this.updateReaction}/>
		}

		if (!this.state.action || !this.state.reaction)
			return null
		return (
			<div>
				<Navbar/>
				<div className="container">
					<form className="panelaction" onSubmit={this.handleSubmit}>
						<Grid container spacing={16}>
							<Grid className="blockLeft" item xs={6}>
								<React.Fragment>
									<Typography>
										Action
									</Typography>
									{actions[this.state.action]}
								</React.Fragment>

							</Grid>
							<Grid className="blockLeft" item xs={6}>
								<React.Fragment>
									<Typography>
										Reaction
									</Typography>
									{reactions[this.state.reaction]}
								</React.Fragment>

							</Grid>
						</Grid>
						<TextField
                				    value={this.state.name}
                				    onChange={(e) => this.handleName(e)}
                				    label="Area's name"
                				    type="text"
                				    margin="normal"
                				    fullWidth
                				/>
						<Button type="submit">
							Create
						</Button>
					</form>
				</div>
			</div>
		)
	}
}

export default withRouter(AreaForm);