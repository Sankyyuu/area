import React from 'react';
import { TextField } from '@material-ui/core';



class YoutubePost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			channelName: 'zeratorsc2',
			message: "c'est un message merci zera"
		};
	}

	componentDidMount() {
		this.props.updateData({name: "youtube_comment", message: this.state.message, channelName: this.state.channelName})
	}

        handlePost = async  (e) => {
		await this.setState({channelName: e.target.value})
		this.props.updateData({name: "youtube_comment", message: this.state.message, channelName: this.state.channelName})
	}

	handleMessage = async  (e) => {
		await this.setState({message: e.target.value})
		this.props.updateData({name: "youtube_comment", message: this.state.message, channelName: this.state.channelName})
        }

	render() {
		return (
		<div>
			<h5>Post a message on Youtube</h5>

                        <TextField
                		value={this.state.channelName}
                		onChange={(e) => this.handlePost(e)}
                		label="Name channel Youtube"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
				<TextField
                		value={this.state.message}
                		onChange={(e) => this.handleMessage(e)}
                		label="Message you want to commment on Youtube"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
		</div>
		)
	}
}

export default YoutubePost;