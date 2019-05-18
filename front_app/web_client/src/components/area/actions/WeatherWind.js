import React from 'react';
import { Select } from 'semantic-ui-react';
import { TextField } from '@material-ui/core';


const conditionOptions = [
	{key: true, value: true, text:'is windy'},
	{key: false, value: false, text:'is not windy'},
]

class WeatherWind extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			city: "Nice",
                        wind: 'true',
		};
	}
		
	componentDidMount() {
		this.props.updateData({name: "weather_wind", city: this.state.city, isWind: this.state.wind})
	}

        handleCity = async  (e) => {
		await this.setState({city: e.target.value})
		this.props.updateData({name: "weather_wind", city: this.state.city, isWind: this.state.wind})

        }

	handleWind = async (e, data) => {
		await this.setState({wind: data.value})
		this.props.updateData({name: "weather_wind", city: this.state.city, isWind: this.state.wind})
	}

	render() {
		return (
		<div>
			<h5>Weather check wind by city</h5>

                        <TextField
                		value={this.state.name}
                		onChange={(e) => this.handleCity(e)}
                		label="City name (in english)"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
			<div>
				<Select placeholder='Action condition' value={this.state.wind} options={conditionOptions} onChange={this.handleWind} style={{width: "95%", marginTop:"12px"}}/>
			</div>
		</div>
		)
	}
}

export default WeatherWind;