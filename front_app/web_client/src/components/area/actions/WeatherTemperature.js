import React from 'react';
import { Select } from 'semantic-ui-react';
import { TextField } from '@material-ui/core';


const tempOptions = [
        {key: '0', value: '0', text:'0°'},
	{key: '2', value: '2', text:'2°'},
	{key: '4', value: '4', text:'4°'},
	{key: '6', value: '6', text:'6°'},
	{key: '8', value: '8', text:'8°'},
	{key: '10', value: '10', text:'10°'},
	{key: '12', value: '12', text:'12°'},
	{key: '14', value: '14', text:'14°'},
	{key: '16', value: '16', text:'16°'},
        {key: '18', value: '18', text:'18°'},
	{key: '20', value: '20', text:'20°'},
	{key: '22', value: '22', text:'22°'},
	{key: '24', value: '24', text:'24°'},
	{key: '26', value: '26', text:'26°'},
        {key: '28', value: '28', text:'28°'},
	{key: '30', value: '30', text:'30°'},
        {key: '32', value: '32', text:'32°'},
	{key: '36', value: '36', text:'36°'},
]

const conditionOptions = [
	{key: true, value: true, text:'higher than selected temperature'},
	{key: false, value: false, text:'below than selected temperature'},

]

class WeatherTemperature extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			city: "Nice",
			targetTemp: "15",
                        hot: true,
		};
	}
		
	componentDidMount() {
		this.props.updateData({name: "weather_temp", city: this.state.city, targetTemp: this.state.targetTemp, isHot: this.state.hot})
	}

        handleCity = async  (e) => {
		await this.setState({city: e.target.value})
		this.props.updateData({name: "weather_temp", city: this.state.city, targetTemp: this.state.targetTemp, isHot: this.state.hot})
        }
        
	handleTemp = async  (e, data) => {
		await this.setState({targetTemp: data.value})
		this.props.updateData({name: "weather_temp", city: this.state.city, targetTemp: this.state.targetTemp, isHot: this.state.hot})
                
	}

	handleHot = async (e, data) => {
		await this.setState({hot: data.value})
		this.props.updateData({name: "weather_temp", city: this.state.city, targetTemp: this.state.targetTemp, isHot: this.state.hot})
                
	}

	render() {
		return (
		<div>
			<h5>Weather temperature</h5>

                        <TextField
                		value={this.state.name}
                		onChange={(e) => this.handleCity(e)}
                		label="City name (in english)"
                		type="text"
                		margin="normal"
                		fullWidth
                	/>
				<Select label="lol" placeholder='Select the temperature' value={this.state.targetTemp} options={tempOptions} onChange={this.handleTemp} style={{width: "95%", marginTop:"32px"}}/>
			<div>
				<Select placeholder='Action condition' value={this.state.hot} options={conditionOptions} onChange={this.handleHot} style={{width: "95%", marginTop:"12px"}}/>
			</div>
		</div>
		)
	}
}

export default WeatherTemperature;