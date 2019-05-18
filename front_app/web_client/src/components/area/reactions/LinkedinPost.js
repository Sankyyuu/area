import React from 'react';
import { TextField } from '@material-ui/core';



class LinkedinPost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			post: 'Message'
		};
	}

	componentDidMount() {
		this.props.updateData({name: "linkedin_post", post: this.state.post})
	}

        handlePost = async  (e) => {
		await this.setState({post: e.target.value})
		this.props.updateData({name: "linkedin_post", post: this.state.post})
        }

	render() {
		return (
		<div>
			<h5>Post a message on LinkedIn</h5>

                        <TextField
                		value={this.state.name}
                		onChange={(e) => this.handlePost(e)}
                		label="Message you want to post on LinkedIn"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
		</div>
		)
	}
}

export default LinkedinPost;