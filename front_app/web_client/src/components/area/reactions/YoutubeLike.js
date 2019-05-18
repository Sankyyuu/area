import React from 'react';
import { TextField } from '@material-ui/core';



class YoutubeLike extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			channelName: 'zeratorsc2'
		};
	}

	componentDidMount() {
		this.props.updateData({name: "youtube_like", channelName: this.state.channelName})
	}

        handlePost = async  (e) => {
		await this.setState({channelName: e.target.value})
		this.props.updateData({name: "youtube_like", channelName: this.state.channelName})
        }

	render() {
		return (
		<div>
			<h5>like last video Youtube</h5>

                        <TextField
                		value={this.state.channelName}
                		onChange={(e) => this.handlePost(e)}
                		label="Name channel Youtube"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
		</div>
		)
	}
}

export default YoutubeLike;