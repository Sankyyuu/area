import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordTwo: '',
    isRegistered: false,
    open: false,
    snackbar: false,
};

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

class SignUp extends React.Component{
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log()
    };

    handleSubmit = (event) => {
        event.preventDefault();


        axios.post(`https://areaserver.herokuapp.com/user/create`, {username: this.state.username, email: this.state.email, password: this.state.password}, {headers: {'Content-Type':'application/json'}})
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.setState({
                        isRegistered: true,
                        open: true
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
                this.setState( {
                    snackbar: true
                });
            });
    };

    handleClose = () => {
        this.setState({ open: false });
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
            username,
            email,
            password,
            passwordTwo,
        } = this.state;


        const isInvalid =
            password !== passwordTwo ||
            password === '' ||
            email === '' ||
            username === '';

        return (
            <div className="container">
                <Grid container spacing={16}>
                    <Grid className="blockLeft" item xs={5}>
                        <Typography variant="h2" component="title" gutterBottom align="left">
                            We cook a world that works for you
                        </Typography>
                        <img alt="" src={require("../../styles/icons/logo.png")} />
                    </Grid>
                    <Grid className="blockRight" item xs={7}>
                        <div>
                            <Button size="large" className="navForm" color="primary" href="/">Sign in</Button>
                            or
                            <Button size="large" className="navForm" disabled>Sign up</Button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                label="Username"
                                type="text"
                                name="user-name"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                label="Email"
                                type="email"
                                name="email"
                                autoComplete="email"
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
                            <TextField
                                value={this.state.passwordTwo}
                                onChange={this.handleChange('passwordTwo')}
                                label="Confirm password"
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                fullWidth
                            />
                            <div className="buttons">
                                <Button disabled={isInvalid} type="submit" color="inherit">
                                    Register
                                </Button>
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Your account has been created!"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Thank you to be registered!
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="primary">
                                            Close
                                        </Button>
                                        <Button href="/" variant="contained" onClick={this.handleClose} color="primary" autoFocus>
                                            Sign in
                                        </Button>
                                    </DialogActions>
                                </Dialog>
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
                                        message="This email is already use"
                                    />
                                </Snackbar>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(SignUp);