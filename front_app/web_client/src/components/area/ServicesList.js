import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Navbar from '../layout/Navbar'
import '../../styles/css/serviceslits.css'
import axios from "axios";

class ServicesList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            google: false,
            github: false,
            trello: false,
            linkedin: false,
            twitter: false,
            youtube: false,
            weather: true,
            timer: true,
        };

        const oauthScript = document.createElement("script");
        oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

        document.body.appendChild(oauthScript);

        axios.get('https://areaserver.herokuapp.com/user/getProviders/' + localStorage.getItem("user"))
        .then(res => {
            const info = res.data;
            console.log("tab", info)
            this.setState({ 'google': info.google });
            this.setState({ 'github': info.github });
            this.setState({ 'trello': info.trello });
            this.setState({ 'twitter': info.twitter });
            this.setState({ 'linkedin': info.linkedin });
            this.setState({ 'youtube': info.youtube });
            this.setState({ 'weather': info.weather });
            this.setState({ 'timer': info.timer });
        });
        this.deleteGoogle = this.deleteGoogle.bind(this);
    };

    responseGoogle = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('google').done(function(resp) {
            console.log("uid", localStorage.getItem("user"));
            console.log("resp", resp.access_token);
            axios.put('https://areaserver.herokuapp.com/login/google?userId=' + localStorage.getItem("user"), {}, {headers: {'access_token': resp.access_token}});
            that.setState({ 'google': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    };

    deleteGoogle = async () => {
        await this.setState({ 'google': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseGithub = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('github').done(function(resp) {
            console.log("resp", resp);
            axios.put('https://areaserver.herokuapp.com/login/github?userId=' + localStorage.getItem("user"), {}, {headers: {'access_token': resp.access_token}});
            that.setState({ 'github': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    };

    deleteGithub = async () => {
        await this.setState({ 'github': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseTwitter = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('twitter').done(function(resp) {
            console.log("resp", resp);
            axios.put('https://areaserver.herokuapp.com/login/twitter?userId=' + localStorage.getItem("user"), {}, {headers: {'token': resp.oauth_token, 'token_secret': resp.oauth_token_secret}});
            that.setState({ 'twitter': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    }

    deleteTwitter = async () => {
        await this.setState({ 'twitter': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseTrello = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('trello').done(function(resp) {
            console.log("resp", resp);
            axios.put('https://areaserver.herokuapp.com/login/trello?userId=' + localStorage.getItem("user"), {}, {headers: {'token': resp.oauth_token, 'token_secret': resp.oauth_token_secret}});
            that.setState({ 'trello': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    }

    deleteTrello = async () => {
        await this.setState({ 'trello': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseYoutube = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('youtube').done(function(resp) {
            console.log("resp", resp);
            axios.put('https://areaserver.herokuapp.com/login/youtube?userId=' + localStorage.getItem("user"), {}, {headers: {'token': resp.access_token}});
            that.setState({ 'youtube': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    }

    deleteYoutube = async () => {
        await this.setState({ 'youtube': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseLinkedin = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('linkedin2').done(function(resp) {
            console.log("resp", resp);
            axios.put('https://areaserver.herokuapp.com/login/linkedin?userId=' + localStorage.getItem("user"), {}, {headers: {'token': resp.access_token}});
            that.setState({ 'linkedin': true });
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    }

    deleteLinkedin = async () => {
        await this.setState({ 'linkedin': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseWeather = async () => {
        await this.setState({ 'weather': true });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    deleteWeather = async () => {
        await this.setState({ 'weather': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    responseTimer = async () => {
        await this.setState({ 'timer': true });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    deleteTimer = async () => {
        await this.setState({ 'timer': false });
        axios.put('https://areaserver.herokuapp.com/user/setProviders/' + localStorage.getItem("user"), {Providers: this.state})
    }

    render () {
        return (
            <div className="container">
                <Navbar/>
                <div className="title">
                    <Typography variant="h5" component="h3">
                        What ingredients do you use?
                    </Typography>
                </div>
                <Grid container spacing={16}>
                    <Grid item xs={3}>
                        <Card className="card">
                            <img alt="google" src={require("../../styles/icons/logo_gmail.png")} width="250" height="250" className="image"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    GMail
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {this.state.google ? (
                                <Button size="small" color="secondary" onClick={this.deleteGoogle} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseGoogle} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.google}
                                    value="google"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <img alt="github" src={require("../../styles/icons/logo_github.png")} width="250" height="250" className="image"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Github
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.github ? (
                                <Button size="small" color="secondary" onClick={this.deleteGithub} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseGithub} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.github}
                                    value="github"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                        </Grid>
                        <Grid item xs={3}>
                        <Card className="card">
                            <img alt="trello" src={require("../../styles/icons/logo_trello.png")} width="250" height="250" className="image"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Trello
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.trello ? (
                                <Button size="small" color="secondary" onClick={this.deleteTrello} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseTrello} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.trello}
                                    value="trello"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <CardContent>
                            <img alt="twitter" src={require("../../styles/icons/logo_twitter.png")} width="250" height="250" className="image"/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Twitter
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.twitter ? (
                                <Button size="small" color="secondary" onClick={this.deleteTwitter} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseTwitter} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.twitter}
                                    value="twitter"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <CardContent>
                            <img alt="youtube" src={require("../../styles/icons/logo_youtube.png")} width="250" height="250" className="image"/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Youtube
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.youtube ? (
                                <Button size="small" color="secondary" onClick={this.deleteYoutube} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseYoutube} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.youtube}
                                    value="youtube"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <CardContent>
                            <img alt="intra" src={require("../../styles/icons/logo_weather.png")} width="250" height="250" className="image"/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Weather
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.weather ? (
                                <Button size="small" color="secondary" onClick={this.deleteWeather} className="disable">
                                    Disable
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseWeather} className="activate">
                                    Activate
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.weather}
                                    value="weather"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <CardContent>
                            <img alt="intra" src={require("../../styles/icons/logo_timer.png")} width="250" height="250" className="image"/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Timer
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.timer ? (
                                <Button size="small" color="secondary" onClick={this.deleteTimer} className="disable">
                                    Disable
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseTimer} className="activate">
                                    Activate
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.timer}
                                    value="timer"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className="card">
                            <CardContent>
                            <img alt="linkedin" src={require("../../styles/icons/logo_linkedin.png")} width="250" height="250" className="image"/>
                                <Typography gutterBottom variant="h5" component="h2">
                                    LinkedIn
                                </Typography>
                            </CardContent>
                            <CardActions>
                            {this.state.linkedin ? (
                                <Button size="small" color="secondary" onClick={this.deleteLinkedin} className="logout">
                                    Disconnect
                                </Button>
                                )
                                : (
                                <Button size="small" color="primary" onClick={this.responseLinkedin} className="login">
                                    Log in
                                </Button>
                                )}
                                <Checkbox
                                    disabled="true"
                                    checked={this.state.linkedin}
                                    value="linkedin"
                                    color="primary"
                                    className="checkbox"
                                />
                                <Typography gutterBottom component="h2">
                                    Connected
                                </Typography>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ServicesList;