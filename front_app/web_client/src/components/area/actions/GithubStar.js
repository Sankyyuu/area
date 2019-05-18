import React from 'react';
import {TextField} from '@material-ui/core'


class GithubStar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			owner: "",
			repository: "",
		};
	}
		
	componentDidMount() {
	}

	handleOwner = async (e) => {
		await this.setState({owner: e.target.value})
		this.props.updateData({name: "github_star", owner: this.state.owner, repo: this.state.repository})
	}

	handleRepository = async (e) => {
		await this.setState({repository: e.target.value})		
		this.props.updateData({name: "github_star", owner: this.state.owner, repo: this.state.repository})
	}

	render() {
		return (
			<div>
                <h5>Github Star Repo</h5>
                <TextField
                    value={this.state.owner}
                    onChange={(e) => this.handleOwner(e)}
                    label="Owner"
                    type="text"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    value={this.state.repository}
                    onChange={(e) => this.handleRepository(e)}
                    label="Repository"
                    type="text"
                    margin="normal"
                    fullWidth
				/>
			</div>
		)
	}
}

export default GithubStar;