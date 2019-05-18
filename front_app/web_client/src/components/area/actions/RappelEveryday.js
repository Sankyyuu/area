import React from 'react';
import { Select } from 'semantic-ui-react';

const timeZoneOptions = [
	
	{key: 'Pacific/Pago_Pago', value: 'Pacific/Pago_Pago', text:'Pacific/Pago_Pago - UTC -11:00'},
	{key: 'America/Adak', value: 'America/Adak', text:'America/Adak - UTC -10:00'},
	{key: 'America/Sitka', value: 'America/Sitka', text:'America/Sitka - UTC -09:00'},
	{key: 'America/Los_Angeles', value: 'America/Los_Angeles', text:'America/Los_Angeles - UTC -08:00'},
	{key: 'America/Chihuahua', value: 'America/Chihuahua', text:'America/Chihuahua - UTC -07:00'},
	{key: 'America/Chicago', value: 'America/Chicago', text:'America/Chicago - UTC -06:00'},
	{key: 'America/Toronto', value: 'America/Toronto', text:'America/Toronto - UTC -05:00'},
	{key: 'America/Martinique', value: 'America/Martinique', text:'America/Martinique - UTC -04:00'},
	{key: 'America/Argentina/Buenos_Aires', value: 'America/Argentina/Buenos_Aires', text:'America/Argentina/Buenos_Aires - UTC -03:00'},
	{key: 'Atlantic/South_Georgia', value: 'Atlantic/South_Georgia', text:'Atlantic/South_Georgia - UTC -02:00'},
	{key: 'Atlantic/Cape_Verde', value: 'Atlantic/Cape_Verde', text:'Atlantic/Cape_Verde - UTC -01:00'},
	{key: 'Antarctica/Troll', value: 'Antarctica/Troll', text:'Antarctica/Troll - UTC'},
	{key: 'Europe/Andorra', value: 'Europe/Paris', text:'Europe/Paris - UTC +01:00'},
	{key: 'Europe/Sofia', value: 'Europe/Sofia', text:'Europe/Sofia - UTC +02:00'},
	{key: 'Europe/MINSK', value: 'Europe/MINSK', text:'Europe/MINSK - UTC +03:00'},
	{key: 'Asia/Dubai', value: 'Asia/Dubai', text:'Asia/Dubai - UTC +04:00'},
	{key: 'Asia/Kabul', value: 'Asia/Kabul', text:'Asia/Kabul - UTC +04:30'},
	{key: 'Indian/Maldives', value: 'Indian/Maldives', text:'Indian/Maldives - UTC +05:00'},
	{key: 'Asia/Omsk', value: 'Asia/Omsk', text:'Asia/Omsk - UTC +06:00'},
	{key: 'Asia/Jakarta', value: 'Asia/Jakarta', text:'Asia/Jakarta - UTC +07:00'},
	{key: 'Asia/Hong_Kong', value: 'Asia/Hong_Kong', text:'Asia/Hong_Kong - UTC +08:00'},
	{key: 'Asia/Tokyo', value: 'Asia/Tokyo', text:'Asia/Tokyo - UTC +09:00'},
	{key: 'Asia/Vladivostok', value: 'Asia/Vladivostok', text:'Asia/Vladivostok - UTC +10:00'},
	{key: 'Australia/Sydney', value: 'Australia/Sydney', text:'Australia/Sydney - UTC +11:00'},
	{key: 'Pacific/Nauru', value: 'Pacific/Nauru', text:'Pacific/Nauru - UTC +12:00'},
	{key: 'Pacific/Auckland', value: 'Pacific/Auckland', text:'Pacific/Auckland - UTC +13:00'},
	{key: 'Pacific/Apia', value: 'Pacific/Apia', text:'Pacific/Apia - UTC +14:00'},
]

const reactionTimeOptions = [
	{key: '60000', value: '60000', text:'1 minute'},
	{key: '300000', value: '300000', text:'5 minute'},
	{key: '900000', value: '900000', text:'15 minute'},
	{key: '1800000', value: '1800000', text:'30 minute'},
	{key: '3600000', value: '3600000', text:'1 hour'},
	{key: '18000000', value: '18000000', text:'5 hours'},
	{key: '43200000', value: '43200000', text:'12 hours'},
	{key: '86400000', value: '86400000', text:'exactly in one day !'},

]

// [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]


class Rappel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timeZone: "Europe/Paris",
			comparedTime: "",
			timeToSend: "",
		};
	}
		
	componentDidMount() {
		this.props.updateData({name: "rappel_everyday", timeZone: this.state.timeZone, reactionTime: this.state.timeToSend})
        }        

	handleTimeZone = async  (e, data) => {
		await this.setState({timeZone: data.value})
		this.props.updateData({name: "rappel_everyday", timeZone: this.state.timeZone, reactionTime: this.state.timeToSend})
	}

	handlereactionTime = async (e, data) => {
		await this.setState({comparedTime: data.value})
		await this.setState({timeToSend: Date.now() + parseInt(data.value)})
		this.props.updateData({name: "rappel_everyday", timeZone: this.state.timeZone, reactionTime: this.state.timeToSend})

	}

	render() {
		return (
		<div>
			<h5>Timer set recurrent alarm</h5>
				<Select label="lol" placeholder='Select your timezone' value={this.state.timeZone} options={timeZoneOptions} onChange={this.handleTimeZone} style={{width: "95%", marginTop:"59px"}}/>
			<div>
				<Select placeholder='Select the alert time' value={this.state.reactionTime} options={reactionTimeOptions} onChange={this.handlereactionTime} style={{width: "95%", marginTop:"12px"}}/>
			</div>
		</div>
		)
	}
}

export default Rappel;