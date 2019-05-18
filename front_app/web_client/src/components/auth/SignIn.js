import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import '../../styles/css/form.css'

import axios from 'axios';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            snackbar: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseGithub = this.responseGithub.bind(this);

        const oauthScript = document.createElement("script");
        oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

        document.body.appendChild(oauthScript);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://areaserver.herokuapp.com/login`, {email: this.state.email, password: this.state.password}, {headers: {'Content-Type':'application/json'}})
            .then(res => {
                console.log("swag",res.data);
                localStorage.setItem("user", res.data);
                if (res.status === 200) {
                    this.props.history.push("/serviceslist")
                }
            })
            .catch(error => {
                console.log(error.response);
                this.setState( {
                    snackbar: true
                });
            });
    };

    responseGoogle = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('google').done(function(resp) {
            console.log("resp", resp.access_token);
            axios.post('https://areaserver.herokuapp.com/login/google', {}, {headers: {'access_token': resp.access_token}})
            .then(res => {
                console.log(res.data._id);
                localStorage.setItem("user", res.data._id);
                if (res.status === 200) {
                    that.props.history.push("/serviceslist")
                }
            })
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    };

    responseGithub = () => {
        var that = this;
        window.OAuth.initialize('68_EKct8MEGwo7LWSApzFB8Pqf8');
        window.OAuth.popup('github').done(function(resp) {
            console.log("resp", resp.access_token);
            axios.post('https://areaserver.herokuapp.com/login/github', {}, {headers: {'access_token': resp.access_token}})
            .then(res => {
                console.log(res.data._id);
                localStorage.setItem("user", res.data._id);
                if (res.status === 200) {
                    that.props.history.push("/serviceslist")
                }
            })
          }).fail(function(err) {
            //todo when the OAuth flow failed
          });
    };

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbar: false });
    };

    render ()
    {
        const { classes } = this.props;

        const {
            email,
            password,

        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';


        return (
            <div className="container">
                <Grid container spacing={16}>
                    <Grid item xs={5}>
                        <Typography variant="h2" gutterBottom align="left">
                            We cook a world that works for you
                        </Typography>
                        <img alt="" src={require("../../styles/icons/logo.png")} />
                    </Grid>
                    <Grid item xs={7}>
                        <div>
                            <Button size="large" className="navForm" disabled>Sign in</Button>
                            or
                            <Button size="large"  className="navForm" color="primary" href="/signup" >Sign up</Button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                label="Email"
                                name="email"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                fullWidth
                            />
                            <div className="buttons">
                                <Button disabled={isInvalid} type="submit" color="inherit" >
                                    Login
                                </Button>
                            </div>
                        </form>
                        <br />
                        <Typography variant="title" align="center">
                            or
                        </Typography>
                        <div className="buttons">
                            <Grid container spacing={16}>
                                <Grid item xs={6}>
                                <Button size="small" color="primary" onClick={this.responseGoogle}>
                                    Login Google
                                </Button>
                                </Grid>
                                <Grid item xs={6} className="buttonGoogle">
                                <Button size="small" color="primary" onClick={this.responseGithub}>
                                    Login Github
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={4000}
                    onClose={this.handleCloseSnack}
                >
                    <MySnackbarContentWrapper
                        variant="error"
                        className={classes.margin}
                        message="Wrong email/password"
                    />
                </Snackbar>
            </div>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(SignIn);