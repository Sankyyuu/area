import React from 'react';
import {TextField} from '@material-ui/core'


class TwitterPost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: "",
		};
	}
		
	componentDidMount() {
	}
	handleMessage = (e) => {
		this.setState({message: e.target.value})
		this.props.updateData({name: "post_tweet", tweet: this.state.message})
	}

	render() {
		return (
			<div>
                <h5>Post on twitter</h5>
				<TextField
					value={this.state.message}
					onChange={this.handleMessage}
					label="Message"
					type="text"
					margin="normal"
					variant="outlined"
					multiline
                                        fullWidth
                                        style={{marginTop:"58px"}}
				/>
			</div>
		)
	}
}

export default TwitterPost;