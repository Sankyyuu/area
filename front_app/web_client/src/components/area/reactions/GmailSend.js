import React from 'react';
import {TextField} from '@material-ui/core'


class GmailSend extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			to: "",
			subject: "",
			message: "",
		};
	}
		
	componentDidMount() {
	}

	handleTo = (e) => {
		this.setState({to: e.target.value})
		this.props.updateData({name: "send_email", to: this.state.to, subject: this.state.subject, message: this.state.message})
	}

	handleSubject = (e) => {
		this.setState({subject: e.target.value})
		this.props.updateData({name: "send_email", to: this.state.to, subject: this.state.subject, message: this.state.message})

	}
	handleMessage = (e) => {
		this.setState({message: e.target.value})
		this.props.updateData({name: "send_email", to: this.state.to, subject: this.state.subject, message: this.state.message})
	}

	render() {
		return (
			<div>
                <h5>Gmail send mail</h5>
				<TextField
					value={this.state.to}
					onChange={this.handleTo}
					label="To"
					type="text"
					margin="normal"
					fullWidth
				/>
				<TextField
					value={this.state.subject}
					onChange={this.handleSubject}
					label="Subject"
					type="text"
					margin="normal"
					fullWidth
				/>
				<TextField
					value={this.state.message}
					onChange={this.handleMessage}
					label="Message"
					type="text"
					margin="normal"
					variant="outlined"
					multiline
					fullWidth
				/>
			</div>
		)
	}
}

export default GmailSend;