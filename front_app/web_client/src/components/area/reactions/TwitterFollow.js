import React from 'react';
import {TextField} from '@material-ui/core'


class TwitterFollow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			to: "random",
                };
		this.props.updateData({name: "unfollow"})                
	}
		
	componentDidMount() {
		this.props.updateData({name: "unfollow"})
	}

	handleTo = (e) => {
		this.setState({to: e.target.value})
		this.props.updateData({name: "unfollow"})
	}

	render() {
		return (
			<div>
                <h5>Twitter follow user</h5>
				<TextField disabled
					value={this.state.to}
					onChange={this.handleTo}
					label="To"
					type="text"
					margin="normal"
                                        fullWidth
                                        style={{marginTop:"58px"}}
				/>
			</div>
		)
	}
}

export default TwitterFollow;