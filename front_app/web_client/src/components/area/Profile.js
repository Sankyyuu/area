import React from 'react';
import * as routes from './../../constants/routes';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import '../../styles/css/profile.css';

import axios from 'axios';
import Navbar from "../layout/Navbar";

class Profil extends React.Component {
	constructor(props) {
	super(props);
	
	this.state = {
		username: '',
		email: '',
		password: '',
		passwordTwo: '',
		open: false,
		deleteOpen: false,
		isModifying: false
	};

	var url = `https://areaserver.herokuapp.com/user/` + localStorage.getItem("user");
	
	axios.get(url)
	.then(res => {
		const info = res.data;
		this.setState({ 'username': info.username });
		this.setState({ 'email': info.email });
		this.setState({ 'password': info.password });
	  });
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	};

	handleDelete = () => {
		var url = `https://areaserver.herokuapp.com/user/` + localStorage.getItem("user");
		axios.delete(url);
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
		console.log()
	};

	handleSubmit = () => {
		var url = `https://areaserver.herokuapp.com/user/` + localStorage.getItem("user");
		axios.put(url,
		{username: this.state.username, email: this.state.email, password: this.state.password},
		{headers: {'Content-Type':'application/json'}})
		.then((response) => {
			console.log("response:", response);
			this.refs.toast.show("Succesfuly connected", 1000);
		})
		.catch((error) => {
			console.log("error:", error);
			//this.refs.toast.show("Login failed", 1000);
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleDeleteOpen = () => {
		this.setState({ deleteOpen: true });
	};

	handleDeleteClose = () => {
		this.setState({ deleteOpen: false });
	};

	handleIsModifying = () => {
		this.setState({ isModifying: true });
	};

	handleIsNotModifying = () => {
		this.setState({ isModifying: false });
	};

	redirect = () => {
		this.props.history.push(routes.SIGN_IN);
	};

	render () {
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
        	<div className="profil_card">
			<Navbar/>
			<Card className="profil_card">
				<CardContent>
						  <Typography gutterBottom variant="h4" component="h2">
							<b>Profile</b>
						  </Typography>
					  <Divider variant="middle"/>
					  <Avatar alt=""
						src={require("../../styles/icons/default_avatar.png")}
						className="profil_avatar"
									/>
				{this.state.isModifying ? (
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
							<Button disabled={isInvalid} type="submit" color="inherit" onClick={() => {this.handleClickOpen(); this.handleIsNotModifying(); this.handleSubmit()}}>
							Modify
							</Button>
						</div>
					</form>
				):(
				<div>
						<Typography gutterBottom variant="h5" component="h2">
							<b>Username:</b> {this.state.username}
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							<b>Email:</b> {this.state.email}
						</Typography>
						<Typography gutterBottom variant="h5" component="h2">
							<b>Password:</b> *********
						</Typography>

					  <CardActions className="btns">
						<Button size="small" color="primary" onClick={this.handleIsModifying} className="btn">
						  Modify
						</Button>
						<Button size="small" color="secondary" onClick={this.handleDeleteOpen}>
						  Delete Account
						</Button>
						<Dialog
						open={this.state.deleteOpen}
						onClose={this.handleDeleteClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						>
						<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Your account will be delete.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => {this.handleDeleteClose(); this.handleDelete(); this.redirect()}} color="primary">
							Yes
							</Button>
							<Button onClick={this.handleDeleteClose} color="secondary">
							No
							</Button>
						</DialogActions>
						</Dialog>
					  </CardActions>
				</div>
				)}
				</CardContent>
				</Card>
            </div>
        )
    }
}

export default Profil