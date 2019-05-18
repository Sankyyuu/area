import React from 'react';
import { Select } from 'semantic-ui-react';
import { TextField } from '@material-ui/core';


const conditionOptions = [
	{key: true, value: true, text:'is raining'},
	{key: false, value: false, text:'is not raining'},
]

class WeatherRain extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			city: "Nice",
                        rain: 'true',
		};
	}
		
	componentDidMount() {
		this.props.updateData({name: "weather_rain", city: this.state.city, isRaining: this.state.rain})
	}

        handleCity = async  (e) => {
		await this.setState({city: e.target.value})
		this.props.updateData({name: "weather_rain", city: this.state.city, isRaining: this.state.rain})

        }

	handleRain = async (e, data) => {
		await this.setState({rain: data.value})
		this.props.updateData({name: "weather_rain", city: this.state.city, isRaining: this.state.rain})
	}

	render() {
		return (
		<div>
			<h5>Weather check rain by city</h5>

                        <TextField
                		value={this.state.name}
                		onChange={(e) => this.handleCity(e)}
                		label="City name (in english)"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
			<div>
				<Select placeholder='Action condition' value={this.state.rain} options={conditionOptions} onChange={this.handleRain} style={{width: "95%", marginTop:"12px"}}/>
			</div>
		</div>
		)
	}
}

export default WeatherRain;